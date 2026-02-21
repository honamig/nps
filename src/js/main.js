import { getParkData, getInfoLinks } from "./parkService.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import "../css/style.css";
import "../css/home.css";



/* Main: intro */
function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

/* Main: insert info cards */
function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate).join("");
  infoEl.insertAdjacentHTML("afterbegin", html);
}

function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;

    document.querySelector(".global-nav").classList.toggle("show");

    if(target.tagName !== "BUTTON") {
      target = target.closest("button");
    }

    if(document.querySelector(".global-nav").classList.contains("show")) {
      target.setAttribute("aria-expanded", "true");
      target.setAttribute("aria-label", "Close Menu");
    } else {
      target.setAttribute("aria-expanded", "false");
      target.setAttribute("aria-label", "Open Menu");
    }
  });
}

async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);

  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
  enableNavigation();
}

init();


