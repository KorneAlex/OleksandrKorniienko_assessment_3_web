import { adminsStore } from "../models/admins-store.js";
import { usersStore } from "../models/user-store.js";

export const adminsController = {
  async logs(req, res) {
    const viewData = {
      title: "Logs",
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      userIsAdmin: await usersStore.userIsAdmin(req.cookies.loggedInUser),
      logsData: await adminsStore.getLogs(),
    };
    console.log("login page rendering");
    // console.log(viewData);
    if(!viewData.userIsAdmin){
        res.redirect("/dashboard");
    }
    res.render("logs", viewData);
  },
}

// TODO: last 100 logs + download? Fix logs design