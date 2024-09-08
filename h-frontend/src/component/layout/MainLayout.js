import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { useEffect } from "react";
import { getIsLogin, logout } from "../../util/sevice";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getIsLogin()) {
      // Use navigate to avoid full page reload
      window.location.href ="/login";
    }
  }, []);

  const onClickBtn1 = () => {
    navigate("/about");  // Corrected the path for "About"
  };
  const onLogout = () => {
    logout();
  }
  return (
    <div>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <Link to="">Dashboard</Link>
        </li>
        <li className={styles.item}>
          <Link to="/room">Room</Link>
        </li>
        <li className={styles.item}>
          <Link to="/room_type">Room Type</Link>
        </li>
        <li className={styles.item}>
          {/* Corrected 'href' to 'to' */}
          <Link to="/reservation">Reservation</Link>
        </li>
        <li className={styles.item}>
          {/* Corrected 'href' to 'to' */}
          <Link to="/about">About Us</Link>
        </li>
        <li className={styles.item}>
          {/* Corrected 'href' to 'to' */}
          <a href="#" onClick={onLogout}>Logout</a>
        </li>
      </ul>
      <button onClick={onClickBtn1}>Link to About</button>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
