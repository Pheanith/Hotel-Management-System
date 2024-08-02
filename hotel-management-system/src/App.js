// src/App.js
import React from 'react';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Reservation from './pages/Reservation';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <Reservation />
      </div>
    </div>
  );
}

export default App;
