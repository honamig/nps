import spritePath from '../images/sprite.symbol.svg';

// Helper: render an inline SVG icon from the sprite sheet
export function iconTemplate(iconId) {
  return `<svg class="icon" role="presentation" focusable="false">
    <use xmlns:xlink="http://www.w3.org/1999/xlink"
         xlink:href="${spritePath}#${iconId}"></use>
  </svg>`;
}

export function mediaCardTemplate(info) {
  return `<article class="media-card">
    <a href="${info.link}">
      <img src="${info.image}" alt="${info.name.replace(" &#x203A;", "")}" />
      <h2>${info.name}</h2>
    </a>
    <p>${info.description}</p>
  </article>`;
}

export function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}

export function getVoicePhone(phoneNumbers) {
  const voice = phoneNumbers.find((phone) => phone.type === "Voice");
  return voice?.phoneNumber ?? "";
}

export function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voicePhone = getVoicePhone(info.contacts.phoneNumbers);

  return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div>
      <p>${mailing.line1}</p>
      <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
    </div>
    <h4>Phone:</h4>
    <p>${voicePhone}</p>
  </section>`;
}

export function alertTemplate(alert) {
  let alertType;

  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }

  return `<li class="alert">
  <svg class="icon" focusable="false" aria-hidden="true">
    <use xlink:href="${spritePath}#alert-${alertType}"></use>
  </svg>
  <div>
    <h3 class="alert-${alertType}">${alert.title}</h3>
    <p>${alert.description}</p>
  </div></li>`;
}

// Visitor center name shown in the conditions list, now with a link
export function visitorCenterTemplate(center) {
  return `<li class="visitor-center">
    <h3><a href="visitor-center.html?id=${center.id}">${center.name}</a></h3>
    <p>${center.description ?? ""}</p>
    <p><strong>Directions:</strong> ${center.directionsInfo ?? ""}</p>
  </li>`;
}

export function activityTemplate(activity) {
  return `<li class="activity">${activity.name}</li>`;
}

/* -----------------------------------------------
   Visitor Center Detail Page Templates
----------------------------------------------- */

// Page title with ranger-station icon
export function vcTitleTemplate(text) {
  return `${iconTemplate("ranger-station")} ${text}`;
}

// Hero image + description paragraph
export function vcInfoTemplate(data) {
  const image = data.images[0];
  return `<figure>
    <img src="${image.url}" alt="${image.altText}" />
    <figcaption>${image.caption} <span>${image.credit}</span></figcaption>
  </figure>
  <p>${data.description}</p>`;
}

// Generic list builder — accepts any item template function
export function listTemplate(data, contentTemplate) {
  const html = data.map(contentTemplate);
  return `<ul>${html.join("")}</ul>`;
}

// Single address block (Physical or Mailing)
function vcAddressTemplate(data) {
  return `<section>
    <h3>${data.type} Address</h3>
    <address>
      ${data.line1}<br />
      ${data.city}, ${data.stateCode} ${data.postalCode}
    </address>
  </section>`;
}

// Renders all addresses from the array
export function vcAddressesListTemplate(data) {
  if (!data || data.length === 0) return "<p>No address available.</p>";
  return data.map((address) => vcAddressTemplate(address)).join("");
}

// Single amenity list item
export function vcAmenityTemplate(data) {
  return `<li>${data}</li>`;
}

// Directions paragraph
export function vcDirectionsTemplate(data) {
  return `<p>${data}</p>`;
}

// Email + first phone number
export function vcContactsTemplate(data) {
  const email = data.emailAddresses?.[0]?.emailAddress ?? "";
  const phone = data.phoneNumbers?.[0]?.phoneNumber ?? "";
  return `<section class="vc-contact__email">
    <h3>Email Address</h3>
    <a href="mailto:${email}">Send this visitor center an email</a>
  </section>
  <section class="vc-contact__phone">
    <h3>Phone numbers</h3>
    <a href="tel:+1${phone}">${phone}</a>
  </section>`;
}

// Single gallery image list item
export function vcImageTemplate(data) {
  return `<li><img src="${data.url}" alt="${data.altText}" /></li>`;
}