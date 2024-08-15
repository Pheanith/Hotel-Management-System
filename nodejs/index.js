const express = require('express');
const {Room} = require("../nodejs/route/Room.route");
const {role} = require("./route/role.route");
const app = express();

app.get("/",(req,res)=>{
  res.send("Hello, Welcome to our System");

})

// call route
Room(app);
role(app);

const port = 8081;
app.listen(port,()=>{
  console.log("http://localhost:"+port);
})