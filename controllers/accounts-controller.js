import { usersStore } from "../models/user-store.js";

export const accountsController = {
  async index(req, res) {
    const viewData = {
      title: "Welcome!",
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      userIsAdmin: await usersStore.userIsAdmin(req.cookies.loggedInUser),
    };
    console.log("login page rendering");
    // console.log(viewData);
    if(await usersStore.userLoggedIn(req.cookies.loggedInUser)){
      res.redirect("/dashboard");
    }
    res.render("login", viewData);
  },

  async account(req, res) {
    const viewData = {
      title: "Account settings",
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      userIsAdmin: await usersStore.userIsAdmin(req.cookies.loggedInUser),
      userName: await usersStore.getUsersFirstNameById(req.cookies.loggedInUser),
      api: req.cookies.api,
    };
    console.log("account page rendering");
    if(await usersStore.userLoggedIn(req.cookies.loggedInUser)){
      if(viewData.userIsAdmin){
      res.render("admin", viewData);
      } else {
        res.render("account", viewData);
      }
    } else {
    res.render("login", viewData);
    }
  },

  async signup(req,res){
    res.render("signup");
  },

  // https://youtu.be/SccSCuHhOw0?si=SIrjrKrOjWZ8FdiQ&t=2040
  async authenticate(req, res) {
    const accessGranted = await usersStore.userCheck(req.body.email, req.body.password);
    // console.log(`access granted: ${accessGranted}`);
    switch(accessGranted){
      case 1:
        const user = await usersStore.getUserByEmail(req.body.email);
        res.cookie("loggedInUser", user.id, { httpOnly: true }); //copilot helped with this one :D
        res.redirect("/dashboard");
        break;
      case 2:
        res.render("login", { title: "Welcome!", "noUser": true, email: req.body.email });
        break;
      case 3:
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
    // console.log(user);
    res.redirect("/");
    },

  async logout(req,res) {
    res.cookie("loggedInUser", "", { httpOnly: true });
    // res.cookie("api", "", { httpOnly: true });
    res.redirect("/");
  },

  async createCookie(req,res) {
    res.cookie("api", req.body.api, { httpOnly: true });
    res.redirect("/account");
  },

  }
