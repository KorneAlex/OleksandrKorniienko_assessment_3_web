import { usersStore } from "../models/user-store.js";

export const aboutController = {
  async index(req, res) {
    const viewData = {
      title: "About",
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      message: "This is a sample application to demonstrate the use of JS, Node.js, Express.js and Handlebars.js in a web development context.",
    };
    console.log("about rendering");
    res.render("about", viewData);
  },
};
