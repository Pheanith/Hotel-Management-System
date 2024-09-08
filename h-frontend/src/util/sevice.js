import { ExpandOutlined } from "@ant-design/icons";

export const isEmptyOrNull = (value) =>{
  if(value === "" || value === null || value ==="null" || value === undefined || value === "undefinded"){
    return true;
  }
  return false;
};
//
export const setUser = (user)=>{
  localStorage.setItem("user",user)
};

export const getUser = ()=>{
  const user =localStorage.getItem("user");
  if(!isEmptyOrNull(user)){
    return JSON.parse(user)
  }
  return null;

};

//
export const setIsLogin = (value)=>{ // 1|0 (1 is login, 0 is not login)
  localStorage.setItem("is_login",value);

};

export const getIsLogin = ()=>{
  const isLogin = localStorage.getItem("is_login");
  if(isLogin === "1"){
    return true;
  }
  return false;

};


//

export const setAccessToken = (access_token) =>{
  localStorage.setItem("access_token",access_token);

};

export const getAccessToken = ()=>{
  return localStorage.getItem("access_token");

};

//

export const setRefreshToken = (refresh_token)=>{
  localStorage.setItem("refresh_token",refresh_token);

};

export const getRefreshToken = ()=>{
 return localStorage.getItem("refresh_token");

};

export const logout = ()=>{
  setUser("");
  setIsLogin("0");
  setAccessToken("");
  setRefreshToken("");
  window.location.href="/login";

};