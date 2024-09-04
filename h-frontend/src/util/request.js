import axios from "axios";
const base_url = "http://localhost:8081/api";
export const request = (url="",method="get",data={})=>{
  return axios({
    url: base_url+ url,
    method: method,
    data : data,
    headers :{},

  })
  .then(res=>{
    return res.data;
  })
  .catch((error)=>{
    alert("Error Fetch API")
  });
};

// It is the fuction that allow us to communicate between server side and client side.