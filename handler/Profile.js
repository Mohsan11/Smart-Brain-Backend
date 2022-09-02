const profilehandle = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where("id", "=", id)
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      }
      // bcrypt.hash(password, null, null, function (err, hash) {
      //   console.log(hash);
      // });
      else {
        res.status(400).json("not found!");
      }
    })
    .catch((err) => res.status(404).json("error getting user"));
};
module.exports = {
  profilehandle: profilehandle,
};
