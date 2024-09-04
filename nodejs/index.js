const express = require("express");
const cors = require("cors");
const { role } = require("./route/role.route");
const { users } = require("./route/users.route");
const { room } = require("./route/room.route");

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// to allow fetch api from frontend
cors({origin: "*"});
app.get("/", (req, res) => {
  res.send("Hello, welcome to our Hotel Management System");
});

// call route

role(app);
users(app);
room(app);
cors(app);

const port = 8081;
app.listen(port, () => {
  console.log("http://localhost:" + port);
});