import { defineEventHandler, readBody } from 'h3';
import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const serverAddress = "127.0.0.1:8188";
const clientId = uuidv4();

function queuePrompt(prompt: object) {
    return fetch(`http://${serverAddress}/prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, client_id: clientId }),
    }).then(res => res.json());
}

function getHistory(promptId: string) {
    return fetch(`http://${serverAddress}/history/${promptId}`).then(res => res.json());
}

function getImage(filename: string, subfolder: string, folderType: string) {
    const params = new URLSearchParams({ filename, subfolder, type: folderType });
    return fetch(`http://${serverAddress}/view?${params}`)
    .then(res => res.arrayBuffer())
    .then(buffer => Buffer.from(buffer).toString('base64'));
}

function loadWorkflow() {
    const workflowPath = "./workflow/workflow.json";
    return JSON.parse(fs.readFileSync(workflowPath, "utf-8"));
}

function modifyWorkflow(variables: any) {
    const workflow = loadWorkflow();
    if (workflow["6"] && workflow["6"].inputs) {
        const {
            gender = "person",
            hairColor = "unknown hair",
            hairStyle = "unknown hair style",
            topClothing = "unknown top",
            bottomClothing = "unknown bottom",
            topColor = "unknown top color",
            topPattern = "unknown top pattern",
            bottomColor = "unknown bottom color",
            race = "unknown race",
            location = "unknown location",
            locationDescription = "unknown location description",
            cameraView = "unknown camera view",
        } = variables;

        workflow["6"].inputs["text"] = `4K resolution, stunningly rendered, ${cameraView} view of an ${race} 40 years old ${gender} photo, with ${hairStyle} ${hairColor} hair, wearing a ${topColor} ${topClothing} with a ${topPattern} pattern and ${bottomColor} ${bottomClothing}, ${location} (${locationDescription}), cinematic lighting, intricate textures, sharp focus, perfect composition, professional photography`;
    } else {
        throw new Error("Invalid workflow structure");
    }
    return workflow;
}

/**
 * Handles the modification of a prompt and communicates with a WebSocket server to execute the modified prompt.
 * 
 * @param {Event} event - The event object containing the request data.
 * @returns {Promise<{ images: string[] } | { error: string }>} - A promise that resolves with an object containing image URLs or an error message.
 * 
 * @throws {Error} - Throws an error if the WebSocket connection fails or if there is an issue with the prompt execution.
 * 
 * The function performs the following steps:
 * 1. Reads the request body to get the variables.
 * 2. Modifies the workflow based on the variables.
 * 3. Establishes a WebSocket connection to the server.
 * 4. Sends the modified workflow to the server and waits for the prompt execution.
 * 5. If the prompt execution is successful, retrieves the generated images and returns their URLs.
 * 6. Handles errors and timeouts appropriately.
 */
export default defineEventHandler(async (event) => {
    try {
        const variables = await readBody(event);
        const modifiedWorkflow = modifyWorkflow(variables);

        const ws = new WebSocket(`ws://${serverAddress}/ws?clientId=${clientId}`);

        return new Promise((resolve, reject) => {
            ws.on('open', async () => {
                try {
                    const promptId = (await queuePrompt(modifiedWorkflow)).prompt_id;

                    let timeout = setTimeout(() => {
                        ws.close();
                        reject({ error: "Timeout reached waiting for prompt execution." });
                    }, 30000);

                    ws.on('message', async (data) => {
                        const message = JSON.parse(data.toString());

                        if (message.type === 'executing' && message.data?.node === null && message.data?.prompt_id === promptId) {
                            clearTimeout(timeout);
                            const history = await getHistory(promptId);
                            const outputs = history[promptId]?.outputs || {};

                            let imageUrls: string[] = [];

                            for (const nodeId in outputs) {
                                if (outputs[nodeId]?.images) {
                                    for (const img of outputs[nodeId].images) {
                                        const imageData = await getImage(img.filename, img.subfolder, img.type);
                                        imageUrls.push(`data:image/png;base64,${imageData}`);
                                    }
                                }
                            }

                            ws.close();
                            resolve({ images: imageUrls });
                        }
                    });
                } catch (error) {
                    ws.close();
                    if (error instanceof Error) {
                      reject({ error: error.message });
                  } else {
                      reject({ error: "An unknown error occurred." });
                  }
                }
            });

            ws.on('error', (error) => {
                reject({ error: error.message });
            });
        });
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
    } else {
        return { error: "An unknown error occurred." };
    }
    }
});
