import { recordsStore } from "../models/records-store.js";
import { stationsStore } from "../models/stations-store.js";
import { usersStore } from "../models/user-store.js";

export const dashboardController = {
  async index(req, res) {
    const viewData = {
     
      title: "Dashboard",
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      userIsAdmin: await usersStore.userIsAdmin(req.cookies.loggedInUser),
      recordsData: await recordsStore.getRecordsData(),
      stationsData: await stationsStore.getStationsData(),
      activeStationsData: await stationsStore.getActiveStationsData(),
      deletedStationsData: await stationsStore.getDeletedStationsData(),
      deleted_station_exist: await stationsStore.deleted_exist(),
      stations_exist: await stationsStore.station_exist(),
    };
    if (viewData.userLoggedIn) {
    console.log("dashboard rendering");
    res.render("dashboard", viewData);
    }
    else {
      res.redirect("/");
    }
  },
};