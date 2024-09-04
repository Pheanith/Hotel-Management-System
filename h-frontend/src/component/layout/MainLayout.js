import { Outlet,Link,useNavigate} from "react-router-dom";
import styles from "./MainLayout.module.css";

const MainLayout = () =>{

  const navigate = useNavigate(); 

  const onClickBtn1 = ()=>{
    navigate("./room");
  };
  return(
    <div>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <Link to={"/home"} >Dashboard</Link>
        </li>
        <li className={styles.item}>
          <Link to="/room">Room</Link>
        </li>
        <li className={styles.item}>
          <Link to="/room_type">Room</Link>
        </li>
        <li className={styles.item}>
          <Link href="/reservation">Reservation</Link>
        </li>
        <li className={styles.item}>
          <Link href="/about">About Us</Link>
        </li>
      </ul>
      <button onClick={onClickBtn1}>Link to About</button>
      {/* <div style={{ height:60, backgroundColor: "plum"}}>
        <div>Main Layout</div>
      </div> */}
      <div>
        <Outlet />
      </div>
    </div>
  );

};

export default MainLayout;