import { usersStore } from "../models/user-store.js";

export const accountsController = {
  async index(req, res) {
    const viewData = {
      title: "Welcome!",
    };
    console.log("login page rendering");
    console.log(viewData);
    res.render("login", viewData);
  },

  async signup(req,res){
    res.render("signup");
  },

  // https://youtu.be/SccSCuHhOw0?si=SIrjrKrOjWZ8FdiQ&t=2040
  async authenticate(req, res) {
    const accessGranted = await usersStore.userCheck(req.body.email, req.body.password);
    console.log(`access granted: ${accessGranted}`);
    switch(accessGranted){
      case 1:
        res.redirect("/dashboard"); // TODO add cookies
        break;
      case 2:
        res.render("login", { title: "Welcome!", "noUser": true, email: req.body.email });
        break;
      case 3:
            console.log(viewData);
        res.render("login", { title: "Welcome!", "wrongPass": true, email: req.body.email });
        break;
      case 4:
        res.render("login", { title: "Welcome!", "noPass": true, email: req.body.email });
        break;
      case 0:
        res.render("login", { title: "Welcome!", "noLoginData": true, email: req.body.email });
        break;
      default:
        res.render("login", { title: "Welcome!", "unknownError": true, email: req.body.email });
        break;
    }
  },

  async register(req,res) {
    const user = req.body;
    await usersStore.addUser(user);
    console.log(user);
    res.redirect("/");
    },
  }
