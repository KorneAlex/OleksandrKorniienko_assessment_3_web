import { stationsStore } from "../models/stations-store.js";
import { recordsStore } from "../models/records-store.js";

export const stationsController = {
  async addStation(request, response) {
      const stationData = {
        name: request.body.name,
        city: request.body.city,
        county: request.body.county,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
      };
      await stationsStore.addStationData(stationData);
      console.log("stations-controller: Station data submitted:", stationData);
      response.redirect("/dashboard");
  },

  async addRecord(request, response) {
    console.log("stations-controller: Adding record to station:", request.params.station_id);
      const newData = {
        code: request.body.code,
        temperature: request.body.temperature,
        wind_speed: request.body.wind_speed,
        wind_direction: request.body.wind_direction,
        pressure: request.body.pressure,
      };
      const station_id = await request.params.station_id;
      console.log(`adding data ${newData} to station ${station_id}`);
      await recordsStore.addRecord(station_id, newData);
      response.redirect("/stations/" + station_id);
  },
}