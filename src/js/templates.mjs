import spritePath from '../images/sprite.symbol.svg';

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
  let alertType = "";

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

export function visitorCenterTemplate(center) {
  return `<li class="visitor-center">
    <h3>${center.name}</h3>
    <p>${center.description ?? ""}</p>
    <p><strong>Directions:</strong> ${center.directionsInfo ?? ""}</p>
  </li>`;
}

export function activityTemplate(activity) {
  return `<li class="activity">${activity.name}</li>`;
}
