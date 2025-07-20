import { dataStore } from "../models/data-store.js";
import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Dashboard",
      dataStore: await dataStore.getWeatherData(),
      stationStore: await stationStore.getStationData(),
    };
    console.log("dashboard rendering");
    response.render("dashboard", viewData);
  },
};