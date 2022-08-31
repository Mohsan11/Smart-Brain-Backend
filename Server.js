const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const { response, json } = require("express");
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

const dataBase = {
  users: [
    {
      id: "123",
      name: "Mohsan",
      email: "mohsanali@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Ahsan",
      email: "Ahsanali@gmail.com",
      password: "biscuits",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "125",
      name: "Anees",
      email: "Anees@gmail.com",
      password: "bistics",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "897",
      hash: "",
      email: "jhon@gmail.com",
    },
  ],
};
app.get("/", (req, res) => {
  res.send(dataBase.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === dataBase.users[0].email &&
    req.body.password === dataBase.users[0].password
  ) {
    res.json(dataBase.users[0]);
    res.json("success");
  } else {
    res.status(400).json("Error loging in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  // bcrypt.hash(password, null, null, function (err, hash) {
  //   console.log(hash);
  // });
  var hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.lenght) {
        res, json(user[0]);
      } else {
        res.status(400).json("not found!");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
});
app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0].entries))
    .catch((err) => res.status(400).json("unable to get entries"));
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
