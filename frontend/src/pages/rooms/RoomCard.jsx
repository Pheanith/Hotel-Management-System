//RoomCard.jsx
// import React, {useState} from "react";
// import '../../components/styles/rooms/Room.css';

// const RoomCard = () => {
//   const [rooms, setRooms] = useState([]);
//   return (
//     <div className="room-cards-container">
//         <div className="room-card-table">
//           <thead>
//             <tr>
//               <th> Select </th>
//               <th> Room number </th>
//               <th> Room type </th>
//               <th> Accommodation type </th>
//               <th> Floor number </th>
//               <th> Price per night </th>
//               <th> Description </th>
//             </tr>
//           </thead>
//           <tbody>
//             {rooms.map((room, index) => (
//               <tr key = {index}>
//                 <td>
//                   <input type="checkbox"/>
//                 </td>
//                 <td>{room.room_number}</td>
//                 <td>{room.room_type_name}</td>
//                 <td>{room.accommodation_type_name}</td>
//                 <td>{room.floor_number}</td>
//                 <td>{room.price_per_night}</td>
//                 <td>{room.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </div>
//       </div>
//   );
// };

// export default RoomCard;