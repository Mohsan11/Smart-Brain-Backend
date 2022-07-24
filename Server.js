const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
      id: 125,
      name: "Anees",
      email: "Anees@gmail.com",
      password: "bistics",
      entries: 0,
      joined: new Date(),
    },
  ],
};
app.get("/", (req, res) => {
  res.send(dataBase.users);
});
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  dataBase.users.forEach((user) => {
    if (user.id === id) {
      return res.json(user);
      found = true;
    }
  });
  if (!found) {
    res.status(404).json("not found.");
  }
});
app.post("/signin", (req, res) => {
  if (
    req.body.email === dataBase.users[0].email &&
    req.body.password === dataBase.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("Invalid user");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  dataBase.users.push({
    id: 126,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(dataBase.users[dataBase.users.length - 1]);
});
app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  dataBase.users.forEach((user) => {
    if ((user.id = id)) {
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("user not found.");
  }
});
app.listen(3001, () => {
  console.log("This is working on Server 3001");
});

// / --> this is working
// /signin  post --> res= sucess/failure
// /register post --> res=new user
// profile/:userid get --> res =user data
// /image --> Put --> user
