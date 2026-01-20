import { footerTemplate } from "./templates.mjs";

function setHeaderInfo(data) {
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;

    document.title = data.fullName;

    const heroImg = document.querySelector(".hero-banner img");
    heroImg.src = data.images[0].url;
    heroImg.alt = data.images[0].altText;

    const heroTitle = document.querySelector(".hero-banner__title");
    heroTitle.textContent = data.name;

    const heroSubtitleSpans = document.querySelectorAll(".hero-banner__subtitle span");
    heroSubtitleSpans[0].textContent = data.designation;
    heroSubtitleSpans[1].textContent = data.states;
}

function setFooter(data) {
    const footerEl = document.querySelector("#park-footer");
    footerEl.innerHTML = footerTemplate(data);
}

export function setHeaderFooter(data) {
    setHeaderInfo(data);
    setFooter(data);
}