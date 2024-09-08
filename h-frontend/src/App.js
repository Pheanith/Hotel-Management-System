import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './page/home/Homepage';
import AboutPage from './page/about/AboutPage';
import RoomPage from './page/room/RoomPage';
import Room_typePage from './page/room_type/Room_typePage';
import MainLayout from './component/layout/MainLayout';
import LoginPage from './page/auth/LoginPage';
import MainLayoutAuth from './component/layout/MainLayoutAuth';
import RegisterPage from './page/auth/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Public/Protected Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/room_type" element={<Room_typePage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<MainLayout />} path="/admin">
          <Route index element={<HomePage />} /> {/* Default /admin route */}
          <Route path="about" element={<AboutPage />} />
          <Route path="room" element={<RoomPage />} />
          <Route path="room_type" element={<Room_typePage />} />
        </Route>

        {/* Authentication Routes */}
        <Route element={<MainLayoutAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<LoginPage />} /> {/* Wildcard Route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
