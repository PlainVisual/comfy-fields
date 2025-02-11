import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  
  return {
    
  genderOptions: [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "non-binary" },
    { label: "Other", value: "other" },
  ],

  hairstyleOptions: [
    { label: "Select Hairstyle", value: "" },
    { label: "Short Hair", value: "short" },
    { label: "Long Hair", value: "long" },
    { label: "Curly Hair", value: "curly" },
    { label: "Straight Hair", value: "straight" },
    { label: "Wavy Hair", value: "wavy" },
    { label: "Buzz Cut", value: "buzz_cut" },
    { label: "Bob Cut", value: "bob_cut" },
    { label: "Ponytail", value: "ponytail" },
    { label: "Braided Hair", value: "braided" },
    { label: "Undercut", value: "undercut" },
  ],

  haircolorOptions: [
    { label: "Select Hair Color", value: "" },
    { label: "Blonde", value: "blonde" },
    { label: "Brown", value: "brown" },
    { label: "Black", value: "black" },
    { label: "Red", value: "red" },
    { label: "Gray", value: "gray" },
    { label: "Other", value: "other" },
  ],

  raceOptions: [
    { label: "Select Race", value: "" },
    { label: "Asian", value: "asian" },
    { label: "Caucasian", value: "caucasian" },
    { label: "African", value: "african" },
    { label: "Latino", value: "latino" },
    { label: "Hispanic", value: "hispanic" },
    { label: "Afro-American", value: "afro-american" },
    { label: "Indigenous", value: "indigenous" },
    { label: "Mixed", value: "mixed" },
    { label: "Native American", value: "native american" },
    { label: "Pacific Islander", value: "pacific islander" },
    { label: "Middle Eastern", value: "middle eastern" },
    { label: "Other", value: "other" },
  ],

  topclothingOptions: [
    { label: "Select Top Clothing", value: "" },
    { label: "T-Shirt", value: "t-shirt" },
    { label: "Shirt", value: "shirt" },
    { label: "Sweater", value: "sweater" },
    { label: "Jacket", value: "jacket" },
    { label: "Blouse", value: "blouse" },
    { label: "Hoodie", value: "hoodie" },
    { label: "Tank Top", value: "tank_top" },
    { label: "Cardigan", value: "cardigan" },
    { label: "Blazer", value: "blazer" },
    { label: "Dress", value: "dress" },
    { label: "Crop Top", value: "crop_top" },
    { label: "Blouse", value: "blouse" },
    { label: "Other", value: "other" },
  ],

  topcolorOptions: [
    { label: "Select Top Color", value: "" },
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Yellow", value: "yellow" },
    { label: "Purple", value: "purple" },
    { label: "Orange", value: "orange" },
    { label: "Pink", value: "pink" },
    { label: "Brown", value: "brown" },
    { label: "Gray", value: "gray" },
    { label: "Other", value: "other" },
  ],

  patternOptions: [
    { label: "Select Pattern", value: "" },
    { label: "Striped", value: "striped" },
    { label: "Polka Dots", value: "polka_dots" },
    { label: "Plaid", value: "plaid" },
    { label: "Floral", value: "floral" },
    { label: "Geometric", value: "geometric" },
    { label: "Animal Print", value: "animal_print" },
    { label: "Abstract", value: "abstract" },
    { label: "Solid", value: "solid" },
  ],

  bottomclothingOptions: [
    { label: "Select Bottom Clothing", value: "" },
    { label: "Jeans", value: "jeans" },
    { label: "Shorts", value: "shorts" },
    { label: "Skirt", value: "skirt" },
    { label: "Trousers", value: "trousers" },
    { label: "Leggings", value: "leggings" },
    { label: "Capris", value: "capris" },
    { label: "Cargo Pants", value: "cargo_pants" },
    { label: "Sweatpants", value: "sweatpants" },
    { label: "Chinos", value: "chinos" },
    { label: "Other", value: "other" },
  ],

  bottomcolorOptions: [
    { label: "Select Bottom Color", value: "" },
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Yellow", value: "yellow" },
    { label: "Other", value: "other" },
  ],

  locationOptions: [
    { label: "Select Location", value: "" },
    { label: "Amsterdam, Netherlands", value: "Amsterdam, Netherlands" },
    { label: "Tokyo, Japan", value: "Tokyo, Japan" },
    { label: "Paris, France", value: "Paris, France" },
    { label: "New York City, USA", value: "New York City, USA" },
    { label: "Dubai, UAE", value: "Dubai, UAE" },
    { label: "Rio de Janeiro, Brazil", value: "Rio de Janeiro, Brazil" },
    { label: "Sydney, Australia", value: "Sydney, Australia" },
    { label: "Cairo, Egypt", value: "Cairo, Egypt" },
    { label: "London, UK", value: "London, UK" },
  ],

  cameraviewOptions: [
    { label: "Select Camera View", value: "" },
    { label: "Close-up", value: "close-up" },
    { label: "Wide angle", value: "wide angle" },
    { label: "Eye-level headshot", value: "eye-level headshot" },
    { label: "Over the shoulder", value: "over the shoulder" },
    { label: "Low angle", value: "low angle" },
    { label: "High angle", value: "high angle" },
    { label: "Side view", value: "side view" },
    { label: "Front view", value: "front view" },
    { label: "Three-quarter view", value: "three-quarter view" },
    { label: "Bird's eye view", value: "birds eye view" },
    { label: "Worm's eye view", value: "worms eye view" },
    { label: "Dutch angle", value: "dutch angle" },
    { label: "Overhead shot", value: "overhead shot" }
  ],
  

};













});