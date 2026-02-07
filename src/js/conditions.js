import { getParkData, getAlertsData, getVisitorCenterData } from "./parkService.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";
import "../css/style.css";
import "../css/conditions.css";


function setAlerts(alerts) {
  const list = document.querySelector(".alerts ul");
  list.innerHTML = alerts.map(alertTemplate).join("");
}

function setVisitorCenters(centers) {
  const list = document.querySelector(".visitor details ul");
  list.innerHTML = centers.map(visitorCenterTemplate).join("");
}

function setActivities(activities) {
    const list = document.querySelector(".activities details ul");
    list.innerHTML = activities.map(activityTemplate).join("");
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);

  const alerts = await getAlertsData(parkData.parkCode);
  setAlerts(alerts);

  const centers = await getVisitorCenterData(parkData.parkCode);
  setVisitorCenters(centers);

  setActivities(parkData.activities);
}


init();
