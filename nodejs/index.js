const express = require('express');
const {Room} = require("../nodejs/route/Room.route");
const app = express();

app.get("/",(req,res)=>{
  res.send("Hello, Welcome to our System");

})

// call route
Room(app);

const port = 9999;
app.listen(port,()=>{
  console.log("http://localhost:"+port);
})