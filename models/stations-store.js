import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";
import { recordsStore } from "./records-store.js";

const db = initStore("stationsData");
const dbRecords = initStore("recordsData");

export const stationsStore = {

  async getStationsData() {
    await db.read();
    return db.data.stationsData;
  },

  async getActiveStationsData() {
    await db.read();
    const activeStationsList = await db.data.stationsData.filter((s) => s.station.deleted === false);
    return activeStationsList;
  },

  async getDeletedStationsData() {
    await db.read();
    const deletedStationsList = await db.data.stationsData.filter((s) => s.station.deleted === true);
    return deletedStationsList;
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

  async deleteStation(id) {
    await db.read();
    const stationToBeDeleted = await stationsStore.getStationById(id);
    stationToBeDeleted.station.deleted = true;
    stationToBeDeleted.station.deleted_by = "Admin"; // TODO add other admins
    stationToBeDeleted.station.deleted_timestamp = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    console.log(`stations-store: Station ${stationToBeDeleted.station.name} has been successfully deleted.`);
    await db.write();
    return stationToBeDeleted;
  },

  async deleteStationFromDB(id) {
    await db.read();
    await db.stationsStore.splice(stationsStore.getStationIndexByID(3, 1));
    console.log(`stations-store: Station ${stationName} has been successfully removed from the database.`);
    await db.write();
  },


   async restoreStation(id) {
    await db.read();
    const stationToBeRestored = await stationsStore.getStationById(id);
    stationToBeRestored.station.deleted = false;
    stationToBeRestored.station.deleted_by = null; // TODO maybe add restored
    stationToBeRestored.station.deleted_timestamp = null; // TODO maybe add restored
    console.log(`stations-store: Station ${stationToBeRestored.station.name} has been successfully restored.`);
    await db.write();
    return stationToBeRestored;
  },

async getStationById(id) {
  await db.read();
  return await db.data.stationsData.find(s => s.station.id === id);
},

// async getStationById(id) {
//   await db.read();
//   const list = await db.data.stationsData.find(s => s.station.id === id);
//   list.stations = await recordsStore.getRecordsDataByStationId(id);
//   return list;
// },

async getStationIndexByID(id) {
  await db.read();
  console.log(await db.data.stationsData.findIndex(s => s.station.id === id));
  return await db.data.stationsData.findIndex(s => s.station.id === id);
},
}