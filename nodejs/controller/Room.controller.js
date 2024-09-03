
const getList = async(req,res) =>{
  try{
    var sql = "SELECT * FROM Rooms";
    const [data] = await db.query(sql);
    res.json({
      list: data,
    });

  }catch(error){
    logError("room.getList",error,res);
    
  }
}
// list room by id
const getOne = async(req,res) =>{
  try{
    var sql = "SELECT * FROM Rooms WHERE Id:Id";
    const [data] = await db.query(sql,{Id:req.params.id}); // params.id (id small letter because our route "/api/Room:/id")
    res.json({
      list: data,
    });

  }catch(error){
    logError("room.getList",error,res);
    
  }
}
const create = (req,res) =>{
  res.send("Add new rooms");
}
const update = (req,res) =>{
  res.send("Update rooms");
}
const remove = (req,res) =>{
  res.send("Delete  rooms");
}

module.exports = {
  getList, getOne, create, update, remove
}