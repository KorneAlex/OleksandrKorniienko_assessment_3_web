import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";

const db_usr = initStore("usersData");

export const usersStore = {

    async addUser(user){
        await db_usr.read();
        user.id = v4();
        user.created_timestamp = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
        user.admin = false;
        db_usr.data.usersData.push(user);
        await db_usr.write();
        return user;
    },
    
    async getUserByEmail(email){
        await db_usr.read();
        const user = db_usr.data.usersData.find((u) => u.email === email);
        return user ? user:"No user";
    }
}