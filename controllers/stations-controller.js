import { stationsStore } from "../models/stations-store.js";
import { recordsStore } from "../models/records-store.js";
import { usersStore } from "../models/user-store.js";
import { weatherCodeStore } from "../models/weatherCodes-store.js";

export const stationsController = {

  async index(req, res) {
    const station_id = req.params.station_id;
    const currentStation = await stationsStore.getStationById(station_id);
    // this check was added by AI. I broke my head trying to find why everythind suddenly stopped working
    if (!currentStation) {
      return res.status(404).send("Station not found");
    }
    let editRecord = null;
    if (req.params.edit=="true") {
      editRecord = req.params.record_id;
    }
    const viewData = {
      title: "Station " + String(currentStation.name),
      // city: String(currentStation.city),
      currentUserID: await req.cookies.loggedInUser,
      station_id: req.params.station_id,
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      userIsAdmin: await usersStore.userIsAdmin(req.cookies.loggedInUser),
      recordsData: await recordsStore.getRecordsDataByStationId(station_id),
      currentStation: currentStation,
      activeRecordsExist: await recordsStore.recordsExist(station_id),
      activeRecordsDataByStationId: await recordsStore.getActiveRecordsDataByStationId(station_id),
      deletedRecordsByStationIdExist: await recordsStore.deletedRecordsByStationIdExist(station_id),
      deletedRecordsDataByStationId: await recordsStore.getDeletedRecordsDataByStationId(station_id),
      deletedRecordsDataByUserId: await recordsStore.getDeletedRecordsDataByUserId(req.cookies.loggedInUser),
      editRecord: editRecord,
      summaryForTheStation: await stationsStore.getSummaryForTheStation(station_id),
      currentWeatherConditions: await stationsStore.getCurrentWeatherConditions(req.params.station_id),
      codesList: await weatherCodeStore.getCodesList(),
      weatherApiExist: req.cookies.WEATHER_API_KEY? true:false,
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

  async editStation(req, res) {
      const newData = {
          name: req.body.name,
          city: req.body.city,
          county: req.body.county,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        };
        // console.log("New Data to write : " + JSON.stringify(newData));
        if(await usersStore.userIsAdmin(req.cookies.loggedInUser)){
        await stationsStore.editStation(req.params.station_id, newData, req.cookies.loggedInUser);
        } else {
          console.log("you dont have permission to do it!")
        }
        // res.stationToEdit = null;
        res.redirect("/dashboard");
    },

  async deleteStation(req, res) {
    await stationsStore.deleteStation(req.params.station_id, req.cookies.loggedInUser);
      res.redirect("/dashboard");
  },

  async deleteStationFromDB(req, res) {
    await stationsStore.deleteStationFromDB(req.params.station_id, req.cookies.loggedInUser);
      res.redirect("/dashboard");
  },

    async restoreStation(req, res) {
    await stationsStore.restoreStation(req.params.station_id, req.cookies.loggedInUser);
      res.redirect("/dashboard");
  },

  }
