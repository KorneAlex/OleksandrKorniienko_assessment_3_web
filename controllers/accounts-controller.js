import { usersStore } from "../models/user-store.js";

export const accountsController = {
  async index(req, res) {
    const viewData = {
      title: "Welcome!",
    };
    console.log("login page rendering");
    res.render("login", viewData);
  },

  async signup(req,res){
    res.render("signup");
  },

  async authenticate(req, res) {
    const user = usersStore.getUserByEmail(req.body.email);
    res.redirect("/dashboard");
  },

  async register(req,res) {
    const user = req.body;
    await usersStore.addUser(user);
    console.log(user);
    res.redirect("/");
    },
  }
