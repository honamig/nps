import { getParkData, getInfoLinks } from "./parkService.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import "../css/style.css";
import "../css/home.css";

// Fill in the park name and description
function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

// Build and insert the info cards
function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate).join("");
  infoEl.insertAdjacentHTML("afterbegin", html);
}

// Run on page load
async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);

  // setHeaderFooter now calls enableNavigation() internally
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
}

init();