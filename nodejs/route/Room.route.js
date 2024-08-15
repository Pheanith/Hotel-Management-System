const {getList,getOne,create,update,remove} = require("../controller/Room.controller")
const Room = (app) =>{
  app.get("/api/Room",getList);
  app.get("/api/Room:/id",getOne);
  app.post("/api/Room",create);
  app.put("/api/Room",update);
  app.delete("/api/Room/:id",remove);
}

module.exports = {
  Room
}