import { recordsStore } from "../models/records-store.js";
import { stationsStore } from "../models/stations-store.js";


export const recordsController = {

  async index(request, response) {
    const currentStation = await stationsStore.getStationById(request.params.station_id);
    const viewData = {
      title: "Station " + String(currentStation.name), //TODO fix this
      recordsData: await recordsStore.getRecordsDataByStationId(request.params.station_id),
      currentStation: currentStation,
    };
      console.log(`station ${viewData.currentStation.name} is rendering`);
      response.render("station", viewData);
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