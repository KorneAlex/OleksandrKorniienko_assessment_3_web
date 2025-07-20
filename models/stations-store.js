import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";
import { recordsStore } from "./records-store.js";

const db = initStore("stationsData");

export const stationsStore = {

  async getStationsData() {
    await db.read();
    return db.data.stationsData;
  },


  async addStationData(station) {
    await db.read();
    station.id = v4();
    station.timestamp_created = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    station.created_by = "Admin"; // TODO add admin users
    station.deleted = false;
    station.deleted_timestamp = null;
    station.deleted_by = null;
    db.data.stationsData.push({ station });
    await db.write();
    console.log("stations-store: Station data saved successfully.");
    return station;
},

async getStationById(id) {
  await db.read();
  const list = db.data.stationsData.find(s => s.station.id === id);
  list.stations = await recordsStore.getRecordsDataByStationId(id);
  return list;
},
}