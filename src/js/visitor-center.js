import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";
import {
  vcTitleTemplate,
  vcInfoTemplate,
  vcAddressesListTemplate,
  vcDirectionsTemplate,
  vcContactsTemplate,
  vcAmenityTemplate,
  vcImageTemplate,
  listTemplate,
} from "./templates.mjs";
import "../css/style.css";
import "../css/visitor-center.css";

// Read a single URL search parameter by name
function getParam(param) {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(param);
}

// Build the full visitor center page from API data
function renderVisitorCenter(data) {
  // Title
  const titleEl = document.querySelector(".vc-name");
  titleEl.innerHTML = vcTitleTemplate(data.name);

  // Info section (image + description)
  const infoEl = document.querySelector(".vc-info");
  infoEl.innerHTML = vcInfoTemplate(data);

  // Addresses accordion content
  const addressEl = document.querySelector("#vcAddresses");
  const addressContent = vcAddressesListTemplate(data.addresses);
  // Remove placeholder content and append real content after summary
  const addressSummary = addressEl.querySelector("summary");
  addressEl.innerHTML = "";
  addressEl.appendChild(addressSummary);
  addressEl.insertAdjacentHTML("beforeend", addressContent);

  // Directions accordion content
  const directionsEl = document.querySelector("#vcDirections");
  const directionsSummary = directionsEl.querySelector("summary");
  directionsEl.innerHTML = "";
  directionsEl.appendChild(directionsSummary);
  directionsEl.insertAdjacentHTML(
    "beforeend",
    vcDirectionsTemplate(data.directionsInfo)
  );

  // Amenities accordion content
  const amenitiesEl = document.querySelector("#vcAmenities");
  const amenitiesSummary = amenitiesEl.querySelector("summary");
  amenitiesEl.innerHTML = "";
  amenitiesEl.appendChild(amenitiesSummary);
  amenitiesEl.insertAdjacentHTML(
    "beforeend",
    listTemplate(data.amenities, vcAmenityTemplate)
  );

  // Contact accordion content
  const contactEl = document.querySelector("#vcContact");
  const contactSummary = contactEl.querySelector("summary");
  contactEl.innerHTML = "";
  contactEl.appendChild(contactSummary);
  contactEl.insertAdjacentHTML("beforeend", vcContactsTemplate(data));

  // Image gallery — replace the placeholder ul with real content
  const gallerySection = document.querySelector(".vc-gallery");
  const oldUl = gallerySection.querySelector("ul");
  oldUl.remove();
  gallerySection.insertAdjacentHTML("beforeend", listTemplate(data.images, vcImageTemplate));
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);

  const id = getParam("id");
  if (!id) {
    document.querySelector(".vc-name").textContent = "Visitor center not found.";
    return;
  }

  const centerDetails = await getParkVisitorCenterDetails(id);
  renderVisitorCenter(centerDetails);
}

init();