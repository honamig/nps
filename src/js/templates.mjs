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
