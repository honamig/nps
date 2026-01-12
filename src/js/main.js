// Import park data function from parkService module
import { getParkData } from "./parkService.mjs";
// Get park data object
const parkData = getParkData();

/* disclaimer */
// Select the link inside the disclaimer paragraph
const disclaimer = document.querySelector(".disclaimer > a");
// Set the link URL to the official park website
disclaimer.href = parkData.url;
// Set the link text to the full park name
disclaimer.innerHTML = parkData.fullName;

/* page title */
// Change the browser tab title to the park name
document.title = parkData.fullName;

/* hero banner image */
// Select the hero banner image element
const heroImg = document.querySelector(".hero-banner img");
// Use the first image from the park data
heroImg.src = parkData.images[0].url;
// Set alt text for accessibility
heroImg.alt = parkData.images[0].altText;

/* hero banner text */
// Select the hero title element
const heroTitle = document.querySelector(".hero-banner__title");
// Set the park name
heroTitle.textContent = parkData.name;
// Select both subtitle span elements
const heroSubtitleSpans = document.querySelectorAll(".hero-banner__subtitle span");
// Set park designation (i.e. National Park)
heroSubtitleSpans[0].textContent = parkData.designation;
// Set park states (i.e. ID, MT, WY)
heroSubtitleSpans[1].textContent = parkData.states;