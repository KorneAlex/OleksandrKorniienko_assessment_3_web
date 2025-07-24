import { recordsStore } from "../models/records-store.js";
import { stationsStore } from "../models/stations-store.js";

export const dashboardController = {
  async index(req, res) {
    const station_id = req.params.station_id;
    const viewData = {
      title: "Dashboard",
      recordsData: await recordsStore.getRecordsData(),
      stationsData: await stationsStore.getStationsData(),
      activeStationsData: await stationsStore.getActiveStationsData(),
      deletedStationsData: await stationsStore.getDeletedStationsData(),
      deleted_station_exist: await stationsStore.deleted_exist(),
      stations_exist: await stationsStore.station_exist(),
    };
    console.log("dashboard rendering");
    res.render("dashboard", viewData);
  },
};