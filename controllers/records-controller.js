import { recordsStore } from "../models/records-store.js";
import { usersStore } from "../models/user-store.js";




export const recordsController = {


    async addRecord(req, res) {
    console.log("stations-controller: Adding record to station:", req.params.station_id);
      const newData = {
        source: "User input",
        code: req.body.code,
        temperature: req.body.temperature,
        wind_speed: req.body.wind_speed,
        wind_direction: req.body.wind_direction,
        pressure: req.body.pressure,
      };
      const station_id = await req.params.station_id;
      console.log(`adding data ${newData} to station ${station_id}`);
      await recordsStore.addRecord(station_id, newData, req.cookies.loggedInUser);
      res.redirect("/stations/" + station_id);
  },

  async editRecord(req, res) {
    console.log("Edit Record: " + req.params.record_id)
    const newData = {
        code: req.body.code,
        temperature: req.body.temperature,
        wind_speed: req.body.wind_speed,
        wind_direction: req.body.wind_direction,
        pressure: req.body.pressure,
      };
      // console.log("New Data to write : " + newData);
      const record = await recordsStore.getRecordById(req.params.record_id);
      if(await usersStore.accessCheck(req.cookies.loggedInUser, record.created_by)){
      await recordsStore.editRecord(req.params.record_id, newData, req.cookies.loggedInUser);
      }
      const station_id = await req.params.station_id;
      res.redirect("/stations/" + station_id);
  },

    async deleteRecord(req, res) {
      const station_id = await req.params.station_id;
      const record = await recordsStore.getRecordById(req.params.record_id);
      if(await usersStore.accessCheck(req.cookies.loggedInUser, record.created_by)){
      await recordsStore.deleteRecord(await req.params.record_id, req.cookies.loggedInUser);
      }
      res.redirect("/stations/" + station_id);
  },

  async deleteRecordFromDB(req, res) {
    const station_id = await req.params.station_id;
      const record = await recordsStore.getRecordById(req.params.record_id);
      if(await usersStore.accessCheck(req.cookies.loggedInUser, record.created_by)){
    await recordsStore.deleteRecordFromDB(req.params.record_id);
    }
      res.redirect("/stations/" + station_id);
  },

    async restoreRecord(req, res) {
      const station_id = await req.params.station_id;
      const record = await recordsStore.getRecordById(req.params.record_id);
      if(await usersStore.accessCheck(req.cookies.loggedInUser, record.created_by)){
    await recordsStore.restoreRecord(req.params.record_id);
      }
      res.redirect("/stations/" + station_id);
  },

    async requestCurrentWeatherData(req,res) {
      const station_id = await req.params.station_id;
    await recordsStore.getCurrentWeatherData(req.params.station_id, req.cookies.loggedInUser, req.cookies.api);
    res.redirect("/stations/" + station_id);
  },
}