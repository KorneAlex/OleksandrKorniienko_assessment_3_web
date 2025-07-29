import { initStore } from "../utils/store-utils.js";

const db = initStore("weatherCodesData");

export const weatherCodeStore = {

    async getWeatherData() {
        await db.read();
        return db.data.weatherCodesData;
    },

    async getCodesList() {
        const data = await weatherCodeStore.getWeatherData();
        let codesList = [];
        let code = 0;
        if(data.length>0) {
        for(let i = 0; i<data.length; i++) {
                code = data[i].id;
                codesList.push({ code: code });
            } 
        }
        else {
        return null;
}
// console.log("CodesLIST: " + JSON.stringify(codesList));
// console.log("code: " + JSON.stringify(codesList.code));
return codesList;
},
}