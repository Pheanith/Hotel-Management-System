import { Outlet } from "react-router-dom";

const MainLayoutAuth = () =>{
  return(
    <div>
      
      <div style={{ height:60, backgroundColor: "rgb(5, 5, 50)"}}>
        <div>Welcome to Login Page</div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );

};

export default MainLayoutAuth;