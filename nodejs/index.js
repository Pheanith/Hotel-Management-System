const express = require("express");
const { role } = require("./route/role.route");
const { users } = require("./route/users.route");
const { room } = require("./route/room.route");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get("/", (req, res) => {
  res.send("Hello, welcome to our Hotel Management System");
});

// call route

role(app);
users(app);
room(app);

const port = 8081;
app.listen(port, () => {
  console.log("http://localhost:" + port);
});