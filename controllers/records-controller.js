import { recordsStore } from "../models/records-store.js";


export const recordsController = {

    async addRecord(req, res) {
    console.log("stations-controller: Adding record to station:", req.params.station_id);
      const newData = {
        code: req.body.code,
        temperature: req.body.temperature,
        wind_speed: req.body.wind_speed,
        wind_direction: req.body.wind_direction,
        pressure: req.body.pressure,
      };
      const station_id = await req.params.station_id;
      console.log(`adding data ${newData} to station ${station_id}`);
      await recordsStore.addRecord(station_id, newData);
      res.redirect("/stations/" + station_id);
  },

    async deleteRecord(req, res) {
      const station_id = await req.params.station_id;
    await recordsStore.deleteRecord(req.params.record_id);
      res.redirect("/stations/" + station_id);
  },

  async deleteRecordFromDB(req, res) {
    const station_id = await req.params.station_id;
    await recordsStore.deleteRecordFromDB(req.params.record_id);
      res.redirect("/stations/" + station_id);
  },

    async restoreRecord(req, res) {
      const station_id = await req.params.station_id;
    await recordsStore.restoreRecord(req.params.record_id);
      res.redirect("/stations/" + station_id);
  }
}