const { getList, getOne, create, update, remove, login, refresh_token } = require("../controller/users.controller");
const {validate_token} = require("../config/service");
const users = (app) => {
  app.get("/api/users",validate_token(), getList);
  app.post("/api/users/login", login);
  app.get("/api/users/:id",validate_token(), getOne);
  app.post("/api/users",validate_token(), create);
  app.put("/api/users",validate_token(), update);
  app.delete("/api/users/:id",validate_token(), remove);
  app.post("/api/users/refresh_token", refresh_token);
}
module.exports = {
  users,
};