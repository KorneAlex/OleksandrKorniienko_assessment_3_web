import { stationsStore } from "../models/stations-store.js";
import { recordsStore } from "../models/records-store.js";
import { usersStore } from "../models/user-store.js";

export const stationsController = {

  async index(req, res) {
    const station_id = req.params.station_id;
    const currentStation = await stationsStore.getStationById(station_id);
    let editRecord = null;
    if (req.params.edit) {
      editRecord = req.params.record_id;
    }
    const viewData = {
      title: "Station " + String(currentStation.name), //TODO fix this
      currentUserID: await req.cookies.loggedInUser,
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      userIsAdmin: await usersStore.userIsAdmin(req.cookies.loggedInUser),
      recordsData: await recordsStore.getRecordsDataByStationId(station_id),
      currentStation: currentStation,
      records_exist: await recordsStore.records_exist(station_id),
      activeRecordsData: await recordsStore.getActiveRecordsDataById(station_id),
      deleted_records_exist: await recordsStore.deleted_records_exist(station_id),
      deletedRecordsData: await recordsStore.getDeletedRecordsDataById(station_id),
      editRecord: editRecord,
    };
      console.log(`station ${viewData.currentStation.name} is rendering`);
      res.render("station", viewData);
    },

  async addStation(req, res) {
      const stationData = {
        name: req.body.name,
        city: req.body.city,
        county: req.body.county,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      };
      await stationsStore.addStationData(stationData, req.cookies.loggedInUser);
      console.log("stations-controller: Station data submitted:", stationData);
      res.redirect("/dashboard");
  },

  async deleteStation(req, res) {
    await stationsStore.deleteStation(req.params.station_id);
      res.redirect("/dashboard");
  },

  async deleteStationFromDB(req, res) {
    await stationsStore.deleteStationFromDB(req.params.station_id);
      res.redirect("/dashboard");
  },

    async restoreStation(req, res) {
    await stationsStore.restoreStation(req.params.station_id);
      res.redirect("/dashboard");
  }
  }
