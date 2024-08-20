const db = require("../config/db");
const {logError} = require ("../config/service")

const getList = async (req,res) =>{
  try{

    const [data] = await db.query("SELECT * FROM role;");

  res.json({
    list: data,
  })
  }catch(error){
    logError("role.getList",error,res);
  }
};

const getOne = async (req,res) =>{
  try{
  
    var param = {
      Id: req.params.id,
    };
    const [data] = await db.query("SELECT * FROM role WHERE Id = :Id", param);
    res.json({
      list: data,
    });

  }catch(error){
    logError("role.getOne",error,res);
  }
  
};
const create = async(req,res) =>{
  try{
    var parameter = {
      Name: req.body.Name,
      Code :req.body.code,
    }
    const [data] = await db.query("INSERT INTO role (Name,Code) VALUES (:Name, :Code)", parameter);
    res.json({
      data:data,
    });
  }catch(error){
    logError("role.create",error,res);
  }
  
};
const update = async(req,res) =>{
  try{
    var parameter = {
      Id: req.body.Id,
      Name: req.body.Name,
      Code :req.body.code,
    }
    const [data] = await db.query("UPDATE  role SET Name=:Name, Code=:Code WHERE Id =:Id;", parameter);
    res.json({
      data:data,
    });
  }catch(error){
    logError("role.update",error,res);

  }
  
};
const remove = async (req,res) =>{
  try{
    var parameter = {
      Id: req.params.id,
    }
    const [data] = await db.query("DELETE FROM  role WHERE Id = :Id", parameter);
    res.json({
      data:data,
    });
  }catch(error){
    logError("role.remove",error,res);

  }
  
}

module.exports = {
  getList, getOne, create, update, remove
}