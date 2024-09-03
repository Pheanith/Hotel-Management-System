const { validate_token } = require("../config/service");
const {getList,getOne,create,update,remove} = require("../controller/room.controller")
const room = (app) =>{
  app.get("/api/Room",validate_token(), getList);
  app.get("/api/Room:/id",validate_token(),getOne);
  app.post("/api/Room",validate_token(), create);
  app.put("/api/Room",validate_token(), update);
  app.delete("/api/Room/:id",validate_token(), remove);
}

module.exports = {
  room
}