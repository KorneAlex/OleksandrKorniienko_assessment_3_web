import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import * as fs from "fs";

export function initStore(dataType) {
  const store = {
    file: `./models/${dataType}.json`,
    [dataType]: [],
  };
  const db = new Low(new JSONFile(store.file));
  if (!fs.existsSync(store.file)) {
    fs.writeFileSync(store.file, JSON.stringify(store));
  }
  return db;
}

export const utils = {

  // i have spent some time on this one... had get a hint from AI about keys to make this function universal
  // and fixed it myself afte 40 min trying to figure out why 15<9 (was comparing Strings)
    async findMin(array, key) {
    let min = parseFloat(array[0][key]);
    for(let i = 0; i<array.length; i++) {
      if (parseFloat(array[i][key]) < min) {
        min = parseFloat(array[i][key]);
      } 
    }
    return min;
  },
  
  async findMax(array, key) {
    let max = parseFloat(array[0][key]);
    for(let i = 0; i<array.length; i++) {
      if (parseFloat(array[i][key]) > max) {
        max = parseFloat(array[i][key]);
      } 
    }
    return max;
  },

  // https://stackoverflow.com/questions/4435170/how-to-parse-float-with-two-decimal-places-in-javascript
  async findAvarage(array, key) {
    let average = 0;
    for(let i = 0; i<array.length; i++) {
        average += parseFloat(array[i][key]);
      } 
    return (average/array.length).toFixed(2);
  },
  
  async test() {},

}
