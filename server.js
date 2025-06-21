const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const database = require("./modal/connect");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

let userLogin = false;

app.get("/", (req, res) => {
  setTimeout(() => {
    if (userLogin) {
      res.render("secretpage", { userLoggedIn: true });
    } else {
      res.render("index", { alreadyUser: false });
    }
  }, 250);
});

app.get("/login", (req, res) => {
  res.render("login", { invalidUser: false });
});

app.get("/resgistration", (req, res) => {
  res.render("registration");
});

app.get("/errorPage", (req, res) => {
  res.render("error");
});

app.post("/allowUser", (req, res) => {
  const loggedIn = req.body["log"];
  if (loggedIn) {
    userLogin = true;
  } else {
    userLogin = false;
  }
  return;
});

app.post("/login", async (req, res) => {
  try {
    const emailId = req.body["email"];
    const password = req.body["password"];
    const findUserInDb = await database.findOne({ emailId: emailId });
    if (findUserInDb) {
      if (findUserInDb.password === password) {
        res.render("secretpage", { userLoggedIn: true });
        return;
      } else {
        res.render("login", { invalidUser: true });
        return;
      }
    } else {
      res.render("login", { invalidUser: true });
      return;
    }
  } catch (e) {
    res.redirect("/errorPage");
    return;
  }
});

app.post("/resgistration", async (req, res) => {
  try {
    const emailId = req.body["email"];
    const password = req.body["password"];

    const isUserPresent = await database.findOne({ emailId: emailId });

    if (isUserPresent) {
      res.render("index", { alreadyUser: true });
      return;
    }

    const newUserRegister = await database.create({
      emailId: emailId,
      password: password,
    });
    if (newUserRegister) {
      res.render("secretpage", { userLoggedIn: true });
      return;
    } else {
      res.redirect("/");
      return;
    }
  } catch (e) {
    res.redirect("/errorPage");
    return;
  }
});

app.listen(3000, () => {
  console.log("Server Started");
});
