const db = require("../config/db");

const getList = async (req,res) =>{
  try{

    const [data] = await db.query("SELECT * FROM role;");
    
  res.json({
    list: data,
  })
  }catch(error){
    res.json({
      error:true,
      message:error,
    });

  }
 
};
const getOne = (req,res) =>{

  
}
const create = (req,res) =>{
  
}
const update = (req,res) =>{
  
}
const remove = (req,res) =>{
  
}

module.exports = {
  getList, getOne, create, update, remove
}