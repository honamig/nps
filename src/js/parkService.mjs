const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  let data = {};
  const response = await fetch(baseUrl + url, options);

  if (response.ok) {
    data = await response.json();
  } else {
    throw new Error("response not ok");
  }

  return data;
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=glac");
  return parkData.data[0];
}

const parkInfoLinks = [
    {
        name: "Current Conditions &#x203A;",
        link: "conditions.html",
        image: "",
        description: "See what conditions to expect in the park before leaving on your trip!",
    },
    {
        name: "Fees and Passes &#x203A;",
        link: "fees.html",
        image: "",
        description: "Learn about the fees and passes that are available.",
    },
    {
        name: "Visitor Centers &#x203A;",
        link: "visitor_centers.html",
        image: "",
        description: "Learn about the visitor centers in the park.",
    },
];

export function getInfoLinks(images) {
  const withUpdatedImages = parkInfoLinks.map((item, index) => {
    item.image = images[index + 2].url;
    return item;
  });

  return withUpdatedImages;
}

export async function getVisitorCenterData(parkCode) {
  const endpoint = `visitorcenters?parkCode=${parkCode}`;
  const data = await getJson(endpoint);
  return data.data;
}

export async function getAlertsData(parkCode) {
  const endpoint = `alerts?parkCode=${parkCode}`;
  const data = await getJson(endpoint);
  return data.data;
}