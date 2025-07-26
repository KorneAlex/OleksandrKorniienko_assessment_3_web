import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";
import { usersStore } from "./user-store.js";

const db = initStore("stationsData");
const dbRecords = initStore("recordsData");
const db_del_st = initStore("deletedStations");
const db_del_rec = initStore("deletedRecords");

export const stationsStore = {

  async getStationsData() {
    await db.read();
    return db.data.stationsData;
  },

  async getActiveStationsData() {
    await db.read();
    const activeStationsList = await db.data.stationsData.filter((s) => s.deleted === false);
    return activeStationsList;
  },

  async getDeletedStationsData() {
    await db.read();
    const deletedStationsList = await db.data.stationsData.filter((s) => s.deleted === true);
    return deletedStationsList;
  },
  

  async station_exist() {
    const activeStationsList = await stationsStore.getActiveStationsData();
    if(activeStationsList.length != 0) {
      return true;
    }
    return false;
  },


  async deleted_exist() {
    const deletedStationsList = await stationsStore.getDeletedStationsData();
    if(deletedStationsList.length != 0) {
      return true;
    }
    return false;
  },


  async addStationData(station, user_id) {
    await db.read();
    station.id = v4();
    station.timestamp_created = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    station.created_by = user_id;
    station.created_by_name = await usersStore.getUsersFullNameById(user_id);
    station.deleted = false;
    station.deleted_timestamp = null;
    station.deleted_by = null;
    db.data.stationsData.push(station);
    await db.write();
    console.log("stations-store: Station data saved successfully.");
    return station;
},

  async deleteStation(id) {
    await db.read();
    const stationToBeDeleted = await stationsStore.getStationById(id);
    stationToBeDeleted.deleted = true;
    stationToBeDeleted.deleted_by = "Admin"; // TODO add other admins
    stationToBeDeleted.deleted_timestamp = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    console.log(`stations-store: Station ${stationToBeDeleted.name} has been successfully deleted.`);
    await db.write();
    return stationToBeDeleted;
  },

  async deleteStationFromDB(id) {
    await db.read();
    await db_del_st.read();
    const stationToBeDeleted = await stationsStore.getStationById(id);
    console.log(stationToBeDeleted);
    const index = await stationsStore.getStationIndexByID(id);
    await db.data.stationsData.splice(index, 1);
    console.log(`stations-store: Station ${stationToBeDeleted.name} has been successfully removed from the database.`);
    stationToBeDeleted.deleted_fromDB = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    db_del_st.data.deletedStations.push(stationToBeDeleted);
    await db.write();
    await db_del_st.write();
    return stationToBeDeleted;
  },


   async restoreStation(id) {
    await db.read();
    const stationToBeRestored = await stationsStore.getStationById(id);
    stationToBeRestored.deleted = false;
    stationToBeRestored.deleted_by = null; // TODO maybe add restored
    stationToBeRestored.deleted_timestamp = null; // TODO maybe add restored
    console.log(`stations-store: Station ${stationToBeRestored.name} has been successfully restored.`);
    await db.write();
    return stationToBeRestored;
  },

async getStationById(id) {
  await db.read();
  return await db.data.stationsData.find(s => s.id === id);
},

async getStationIndexByID(id) {
  await db.read();
  console.log(await db.data.stationsData.findIndex(s => s.id === id));
  return await db.data.stationsData.findIndex(s => s.id === id);
},
}