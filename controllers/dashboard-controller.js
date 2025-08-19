import { recordsStore } from "../models/records-store.js";
import { stationsStore } from "../models/stations-store.js";
import { usersStore } from "../models/user-store.js";

export const dashboardController = {
  async index(req, res) {
    if (req.params.edit) {
      res.cookie("stationToEdit", req.params.station_id);
    }
    const viewData = {
      title: "Dashboard",
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      userIsAdmin: await usersStore.userIsAdmin(req.cookies.loggedInUser),
      recordsData: await recordsStore.getRecordsData(),
      stationsData: await stationsStore.getStationsData(),
      activeStationsData: await stationsStore.getActiveStationsData(),
      deletedStationsData: await stationsStore.getDeletedStationsData(),
      deletedStationsExist: await stationsStore.deletedStationsExist(),
      stationsExist: await stationsStore.stationsExist(),
      MAP_API_KEY: req.cookies.MAP_API_KEY,
      summaryForTheStation: await stationsStore.getSummaryForTheStations(),
      editStation: await req.params.station_id,
    };
    if (viewData.userLoggedIn) {
      console.log("dashboard rendering ");
      res.render("dashboard", viewData);
    } else {
      res.redirect("/");
    }
  },
};
