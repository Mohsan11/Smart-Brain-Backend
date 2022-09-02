const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const register = require("./handler/register");
const Signin = require("./handler/Signin");
const image = require("./handler/image");
const profile = require("./handler/Profile");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "smartbraindb",
  },
});

// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/signin", (req, res) => {
  Signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.profilehandle(req, res, db);
});
app.put("/image", (req, res) => {
  image.imageHandle(req, res, db);
});

app.listen(3001, () => {
  console.log("This is working on Server 3001");
});

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

// / --> this is working
// /signin  post --> res= sucess/failure
// /register post --> res=new user
// profile/:userid get --> res =user data
// /image --> Put --> user
