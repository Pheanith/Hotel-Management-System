// src/App.js
import React, {useState} from 'react';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Content from './components/sidebar/content';
import Reservation from './pages/Reservation';
import './App.css';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar setSelectedMenuItem={setSelectedMenuItem} />
        <Content selectedMenuItem={selectedMenuItem} />
        <Reservation />
      </div>
    </div>
  );
}

export default App;
