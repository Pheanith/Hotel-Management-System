import React from 'react';
import Reservation from '../../pages/Reservation'; // Import Reservations component
// Import other content components

const Content = ({ selectedMenuItem }) => {
  const contentMap = {
    Reservation: <Reservation />,
    // Add other content components
  };

  return (
    <div className="content">
      {contentMap[selectedMenuItem]}
    </div>
  );
};

export default Content;
