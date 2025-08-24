import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";
import { usersStore } from "./users-store.js";
import { stationsStore } from "./stations-store.js";
import { adminsStore } from "./admins-store.js";

const db_rec = initStore("recordsData");
const db_del_rec = initStore("deletedRecords");

export const recordsStore = {
  
  //https://www.npmjs.com/package/node-fetch#installation
  async fetchWeatherData(lat, lon, api_key) {
    const api = String(api_key);
        // console.log(api);
        // const location = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${api}`);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`);
        const data = await response.json();
        // console.log(JSON.stringify(data));
        return data;
    },

    async getRecordsData() {
        await db_rec.read();
        return db_rec.data.recordsData;
    },

    async getActiveRecordsData() {
      await db_rec.read();
      const activeRecordsList = await db_rec.data.recordsData.filter((r) => r.deleted === false);
      return activeRecordsList;
    },

    async getActiveRecordsDataByStationId(station_id) {
      await db_rec.read();
      const activeRecordsList = await db_rec.data.recordsData.filter((r) => r.deleted === false && r.station_id === station_id);
      return activeRecordsList;
    },
  
    async getDeletedRecordsData() {
      await db_rec.read();
      const deletedRecordsList = await db_rec.data.recordsData.filter((r) => r.deleted === true);
      return deletedRecordsList;
    },

    async getDeletedRecordsDataByStationId(station_id) {
      await db_rec.read();
      const deletedRecordsListById = db_rec.data.recordsData.filter((r) => r.deleted === true && r.station_id === station_id);
      return deletedRecordsListById;
    },

    async getDeletedRecordsDataByUserId(user_id) {
      await db_rec.read();
      // console.log(db_rec.data.recordsData.station_id);
      const deletedRecordsListByUserId = db_rec.data.recordsData.filter((r) => r.deleted === true && r.created_by === user_id);
      return deletedRecordsListByUserId;
    },

    
    
    async recordsExist(station_id) {
      const activeRecordsList = await recordsStore.getActiveRecordsDataByStationId(station_id);
      if(activeRecordsList.length != 0) {
        return true;
      }
      return false;
    },
    
    async deletedRecordsByStationIdExist(station_id) {
      const deletedRecordsList = await recordsStore.getDeletedRecordsDataByStationId(station_id);
      if(deletedRecordsList.length != 0) {
        return true;
      }
      return false;
    },
    
    async addRecord(station_id, record, loggedInUser, extra_info) {
    await db_rec.read();
    record.id = v4();
    record.station_id = station_id;
    record.timestamp_created = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    record.created_by = loggedInUser;
    record.created_by_name = await usersStore.getUsersFullNameById(loggedInUser);
    record.deleted = false;
    record.deleted_timestamp = null;
    record.deleted_by = null;
    db_rec.data.recordsData.push(record);
    await stationsStore.lastTimeUpdatedStation(station_id);
    await db_rec.write();
    console.log("records-store: Records data saved successfully.");
    extra_info = extra_info===""? "manually":extra_info; 
    await adminsStore.createLog(await usersStore.getUsersFullNameById(loggedInUser),"added record ", record.id, " to the station ", station_id, extra_info, "");
    return record;
  },
  
  async getCurrentWeatherData(station_id, loggedInUser, api) {
    const station = await stationsStore.getStationById(station_id);
    const data = await recordsStore.fetchWeatherData(station.latitude, station.longitude, api);
    try {
    const record = {
    source: "OpenWeather",
    code: data.weather[0].id,
    temperature: data.main.temp,
    wind_speed: data.wind.speed,
    wind_direction: data.wind.deg,
    pressure: data.main.pressure,
    }
    // console.log(JSON.stringify(record));
    await recordsStore.addRecord(station_id, record, loggedInUser, " from OpenWeather");
    return record;
  }  catch (error) {
  console.error("didn't fetch. check API?"); // TODO Make a proper error message
  console.error(error);
  await adminsStore.createLog(await usersStore.getUsersFullNameById(loggedInUser), "attempted to fetch data from OpenWeather for the station",``,"",station_id,"ERROR: NO API KEY", "");
  return null;
}
  },

  async getCurrentWeatherDataForAllActiveStations(loggedInUser, api) {
    const activeStations = await stationsStore.getActiveStationsData();
    for(const station of activeStations) {
         console.log(station.id);
      await recordsStore.getCurrentWeatherData(station.id, loggedInUser, api);
    }
    // console.error("getCurrentWeatherDataForAllActiveStations: no stations");
  },

  async editRecord(station_id, record_id, newData, loggedInUser) {
    await db_rec.read();
    const recordToEdit = await db_rec.data.recordsData.find((r) => r.id === record_id);
    const oldData = {
        code: recordToEdit.code,
        temperature: recordToEdit.temperature,
        wind_speed: recordToEdit.wind_speed,
        wind_direction: recordToEdit.wind_direction,
        pressure: recordToEdit.pressure
    };
        console.log("recordToEdit: " + recordToEdit);
        recordToEdit.code = newData.code;
        recordToEdit.temperature = newData.temperature;
        recordToEdit.wind_speed = newData.wind_speed;
        recordToEdit.wind_direction = newData.wind_direction;
        recordToEdit.pressure = newData.pressure;
    recordToEdit.edited_by = loggedInUser;
    recordToEdit.edited_by_name = await usersStore.getUsersFullNameById(loggedInUser);
    recordToEdit.timestamp_edited = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    console.log("Edit record: recordToEdit.code: " + recordToEdit.code);
    await db_rec.write();
    console.log("records-store: Records data edited successfully.");
    await adminsStore.createLog(await usersStore.getUsersFullNameById(loggedInUser),"edited record ", record_id, " on the station ", station_id, ` old data: ${JSON.stringify(oldData)}, new data: ${JSON.stringify(newData)}`, "");
    return recordToEdit;
  },

  async getRecordsDataByStationId(station_id) {
    await db_rec.read();
    return db_rec.data.recordsData.filter(data => data.station_id === station_id);
  },

    async deleteRecord(station_id, record_id, loggedInUser) {
      await db_rec.read();
      const recordToBeDeleted = await recordsStore.getRecordById(record_id);
      recordToBeDeleted.deleted = true;
      recordToBeDeleted.deleted_by = loggedInUser;
      recordToBeDeleted.deleted_timestamp = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
      await db_rec.write();
      await adminsStore.createLog(await usersStore.getUsersFullNameById(loggedInUser),"deleted record ", record_id, " from the station ", station_id, ``,``);
      return recordToBeDeleted;
    },
  
    async deleteRecordFromDB(station_id, record_id, loggedInUser) {
      await db_rec.read();
      await db_del_rec.read();
      const recordToBeDeleted = await recordsStore.getRecordById(record_id);
      const index = await recordsStore.getRecordIndexByID(record_id);
      await db_rec.data.recordsData.splice(index, 1);
      recordToBeDeleted.deleted_fromDB = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
      db_del_rec.data.deletedRecords.push(recordToBeDeleted);
      await db_rec.write();
      await db_del_rec.write();
      await adminsStore.createLog(await usersStore.getUsersFullNameById(loggedInUser),"deleted record ", record_id, " from the station ", station_id, ` from the database`,``);
      return recordToBeDeleted;
    },

    async deleteRecordsFromDbByStationId(station_id, loggedInUser) {
      await db_del_rec.read();
      const recordsToBeDeleted = await recordsStore.getRecordsDataByStationId(station_id);
      for(let i = 0;i<recordsToBeDeleted.length; i++) {
      await db_rec.read();
      const recordToBeDeleted = recordsToBeDeleted[i]
      const index = await recordsStore.getRecordIndexByID(recordToBeDeleted.id);
      await db_rec.data.recordsData.splice(index, 1);
      recordToBeDeleted.deleted_fromDB = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
      db_del_rec.data.deletedRecords.push(recordToBeDeleted);
      await db_rec.write();
      }
      await db_del_rec.write();
      return recordsToBeDeleted;
    },
  
  
     async restoreRecord(station_id, record_id, loggedInUser) {
      await db_rec.read();
      const recordToBeRestored = await recordsStore.getRecordById(record_id);
      recordToBeRestored.deleted = false;
      recordToBeRestored.restored_by = loggedInUser; 
      recordToBeRestored.restored_timestamp = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss"); 
      console.log(`records-store: Record ${recordToBeRestored.name} has been successfully restored.`);
      await db_rec.write();
      await adminsStore.createLog(await usersStore.getUsersFullNameById(loggedInUser),"restored record ", record_id, " to the station ", station_id, ``,``);
      return recordToBeRestored;
    },
  
  async getRecordById(record_id) {
    await db_rec.read();
    return await db_rec.data.recordsData.find(r => r.id === record_id);
  },
  
  async getRecordIndexByID(record_id) {
    await db_rec.read();
    // console.log(await db_rec.data.recordsData.findIndex(r => r.id === record_id));
    return await db_rec.data.recordsData.findIndex(r => r.id === record_id);
  },

}