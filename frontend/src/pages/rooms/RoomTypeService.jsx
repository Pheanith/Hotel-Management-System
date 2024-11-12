// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/room_types';

// const RoomTypeService = {
//     getAllRoomTypes: async () => {
//         const response = await axios.get(API_URL);
//         return response.data;
//     },
//     addRoomType: async (roomType) => {
//         const response = await axios.post(API_URL, roomType);
//         return response.data;
//     },
//     updateRoomType: async (id, updates) => {
//         const response = await axios.put(`${API_URL}/${id}`, updates);
//         return response.data;
//     },
//     deleteRoomType: async (id) => {
//         const response = await axios.delete(`${API_URL}/${id}`);
//         return response.data;
//     }
// };

// export default RoomTypeService;