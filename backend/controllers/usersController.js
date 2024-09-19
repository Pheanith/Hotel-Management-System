const db = requuire("../utils/db");
const {logError, isEmptyOrNull} = require("../utils/service");

const getList = async (req, res) => {
  try{
    const [list] = await db.query("SELECT * FROM users");
    res.json({
      list: list,
    });

  }catch (error) {
    logError("users.getList", error,res);
  }
};

const getOne = async (req, res) => {
  try{
    var parameter = {
      Id: req.params.id,
    };
    const [list] = await db.query("SELECT * FROM users WHERE Id = :id " + parameter);
    res.json({
      list: list,
    });

  }catch (error) {
    logError("Users.getOne", error,res);
  }
};

const create = async (req, res) => {
  try{
    var username= req.body.username;
    var password = req.body.password;
    var error = {};
    if (isEmptyOrNull(username)){
      error.username = "username is required!";
    }
    if(isEmptyOrNull(password)){
      error.password = "password is required!";
    }
    if(Object.keys(error).length > 0){
      res.json({
        error: error,
      });
      return false;
    }
    var parameter = {
      username: username,
      password: password,
    };
    const [list] = await db.query("INSERT INTO users (Username,Password) VALUE (:username,:password)" ,parameter);
    res.json({
      list: list,
    });

  }catch (error) {
    logError("users.create", error,res);
  }
};

const update = async (req, res) => {
  try{
    var username= req.body.username;
    var password = req.body.password;
    var id = req.body.id;
    var error = {};
    if (isEmptyOrNull(username)){
      error.username = "username is required!";
    }
    if (isEmptyOrNull(id)){
      error.id = "id is required!";
    }
    if(isEmptyOrNull(password)){
      error.password = "password is required!";
    }
    if(Object.keys(error).length > 0){
      res.json({
        error: error,
      });
      return false;
    }
    var parameter = {
      id : id,
      username: username,
      password: password,
    };
    const [list] = await db.query("UPDATE  users SET Username=:username, Password=:password WHERE Id =:id" ,parameter);
    res.json({
      list: list,
    });

  }catch (error) {
    logError("users.update", error,res);
  }
};

const remove = async (req, res) => {
  try{
    var Id = req.params.id;
    var error = {};
    if(isEmptyOrNull(Id)){
      error.Id = "Id required!";

    }
    if (Object.keys(error).length > 0){
      res.json({
        error: error,
      })
      return false;
    }
    var parameter = {
      Id: Id,
    };
    const [list] = await db.query("DELETE FROM users WHERE Id = :Id", parameter);
    res.json({
      list: list,
    });
  }catch(error){
    logError("users.remove", error,res);
  }
};


const login = async (req, res) => {
  try{
   var Username = req.body.Username;
   var Password = req.body.Password;
   var error = {};
   if(isEmptyOrNull(Username)){
    error.Username = "Username required";
   }
   if(isEmptyOrNull(Password)){
    error.Password = "Password required";
   }
   if (Object.keys(error).length > 0){
    res.json({
      error: error,
    });
    return false;
   }
   var parameter = {
    Username: Username,
    Password: Password,
   };
   
    const [list] = await db.query("SELECT * FROM users WHERE Username=:Username " , parameter);
    if(data.length > 0){
      var user = data[0];
      if(user.Password === Password){ // password left in DB and Right Password is password request from frontend.
        res.json({
          message: "Login successful",
          user: user,
        });

      }else{
        res.json({
          error: {
            Password: "Password is incorrect!",
          },
        });
        return;
      }
      
    }else{
      res.json({
        error: {
          Username: "Username does not exist!"
        },
      });
      return;
    }
    res.json({
      list: data,
    });

  }catch (error) {
    logError("users.getOne", error,res);
  }
};

module.exports ={
  getList,
  getOne,
  create,
  update,
  remove,
  login,
 };  