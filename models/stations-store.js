import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";
import { usersStore } from "./user-store.js";
import { recordsStore } from "./records-store.js";
import { utils } from "../utils/store-utils.js"
import { weatherCodeStore } from "../models/weatherCodes-store.js"


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
    // console.log("getDeletedStationsData: " + deletedStationsList);
    return deletedStationsList;
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

  async getSummaryForTheStation(station_id) {
    const station = await stationsStore.getStationById(station_id);
     // this check was added by AI. I broke my head trying to find why everythind suddenly stopped working
    if (!station) {
      console.error(`No station found with id: ${station_id}`);
      return null;
    }
    console.log("station : " + JSON.stringify(station.name));
    const stationRecords = await recordsStore.getActiveRecordsDataByStationId(station_id);
    const summaryData = {
      name: station.name,
      city: station.city,
      latitude: station.latitude,
      longitude: station.longitude,
      id: station.id,

      weatherCode: await utils.findLast(stationRecords, "code"),

      currentTemp: await utils.findLast(stationRecords, "temperature"),
      minTemp: await utils.findMin(stationRecords, "temperature"),
      maxTemp: await utils.findMax(stationRecords, "temperature"),
      avarageTemp: await utils.findAvarage(stationRecords, "temperature"),

      currentWindSpeed: await utils.findLast(stationRecords, "wind_speed"),
      currentWindDirection: await utils.findLast(stationRecords, "wind_direction"),
      minWindSpeed:  await utils.findMin(stationRecords, "wind_speed"),
      maxWindSpeed:  await utils.findMax(stationRecords, "wind_speed"),
      avarageWindDirection: await utils.findAvarage(stationRecords, "wind_speed"),

      currentPressure: await utils.findLast(stationRecords, "pressure"),  
      minPressure:  await utils.findMin(stationRecords, "pressure"),
      maxPressure:  await utils.findMax(stationRecords, "pressure"),
      avaragePressure: await utils.findAvarage(stationRecords, "pressure"),

    }
    return summaryData;
  },
  

  async stationsExist() {
    const activeStationsList = await stationsStore.getActiveStationsData();
    if(activeStationsList.length != 0) {
      return true;
    }
    return false;
  },


  async deletedStationsExist() {
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

  async deleteStationFromDB(station_id, loggedInUser) {
    await db.read();
    await db_del_st.read();
    const stationToBeDeleted = await stationsStore.getStationById(station_id);
    console.log(stationToBeDeleted);
    const index = await stationsStore.getStationIndexByID(station_id);
    await db.data.stationsData.splice(index, 1);
    console.log(`stations-store: Station ${stationToBeDeleted.name} has been successfully removed from the database.`);
    stationToBeDeleted.deleted_fromDB = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    db_del_st.data.deletedStations.push(stationToBeDeleted);
    await db.write();
    await db_del_st.write();
    await recordsStore.deleteRecordsFromDbByStationId(station_id, loggedInUser);
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

  async getCurrentWeatherConditions(station_id) {
    let output = null;
    const weatherConditions = await weatherCodeStore.getWeatherData();

    const stationRecords = await recordsStore.getActiveRecordsDataByStationId(station_id);

    // This didn't work. I spent too much time on it. if c.id == 302 it works. 
    // if the number is in the code variable (parsed or not) it just does't work. Decided to make a new method.
    // const code = await utils.findLast(stationRecords, "code");
    // const data = await weatherConditions.find((c) => c.id == code); 
    // const parsedCode = parseInt(code);
    // console.log("code: " + typeof code + " parsedCode: " + typeof parsedCode + " " + typeof 302);
    // console.log("code: " + parsedCode + " getCurrentWeatherConditions: " + JSON.stringify(data));
    if (stationRecords.length>0) {
    const lastRecord = stationRecords[stationRecords.length-1];
    const data = await weatherConditions.find((c) => c.id == lastRecord.code); // I have no idea why it works now....
    // console.log("lastRecord: " + JSON.stringify(lastRecord) + " getCurrentWeatherConditions: " + JSON.stringify(data));
    if (data) {
      output = {
        code: lastRecord.code,
        main: data.main,
        description: data.description,
        icon: data.icon,
      };
    } else {
      output = {
        code: lastRecord.code,
        main: "Unknown",
        description: "No description available",
        icon: null,
      };
    }
  }
    // console.log("code: " + lastObject.code + " getCurrentWeatherConditions: " + JSON.stringify(code));
    return output;
  },

  async test() {},


}