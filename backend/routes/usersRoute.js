const { getList,getOne,create,update,remove,login} = require ("../controllers/usersController");
const controllers = require('../controllers/usersController');
const users = (app) =>{
  app.get("/api/users",controllers.getList);
  app.post("/api/users/login",login);
  app.get("/api/users/:id",controllers.getOne);
  app.post("/api/users",create);
  app.put("/api/users",update);
  app.delete("/api/users/:id",remove);
 };

module.exports = 
{
  users,
};
