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
        return user ? user:false;
    },

    async userCheck(email, pass) {
        await db_usr.read();
        console.log("email: " + email);
        console.log("pass: " + pass);
        if (email) {
            if (pass) {
                const user = await this.getUserByEmail(email);
                if (user) {
                    if (user.password === pass) {
                        console.log(`User ${user.email} and pass ${user.password} exist`);
                        return 1;
                    } else {
                        console.log("User exist, pass - incorrect");
                        return 3;
                    }
                } else {
                    console.log("No such user");
                    return 2;
                }
            }
            console.log("No pass entered");
            return 4;
        }
        console.log("No data entered");
        return 0;
    },

    async enteredPassExist(pass) {
        await db_usr.read();
        const userWithEnteredPassExist = await db_usr.data.usersData.find((u) => u.password === pass);
        if (userWithEnteredPassExist) {
            return true;
        }
        return false;
    },
}