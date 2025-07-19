import { dataStore } from "../models/data-store.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Dashboard",
      dataStore: await dataStore.getWeatherData(),
    };
    console.log("dashboard rendering");
    response.render("dashboard", viewData);
  },
};