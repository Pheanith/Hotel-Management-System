var ListRoom = [
  {
    Roomid: 1,
    Roomtype: "Single",
    Floor: "1",
    Roomnumber: "101",
    Status: "Active",
    price: "20$",
    Transaction: "Hand"
  }
]
const getList = (req,res) =>{
  res.json({
    list: ListRoom
  })
 
}
const getOne = (req,res) =>{
  res.send("List a rooms");
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