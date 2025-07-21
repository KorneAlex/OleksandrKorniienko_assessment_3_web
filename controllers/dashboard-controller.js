import { recordsStore } from "../models/records-store.js";
import { stationsStore } from "../models/stations-store.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Dashboard",
      recordsData: await recordsStore.getRecordsData(),
      stationsData: await stationsStore.getStationsData(),
      activeStationsData: await stationsStore.getActiveStationsData(),
      deletedStationsData: await stationsStore.getDeletedStationsData(),
    };
    console.log("dashboard rendering");
    response.render("dashboard", viewData);
  },
};