// import React, { useState, useEffect } from 'react';
// import './RoomModal.css';

// const RoomModal = ({ isOpen, onClose, roomData, onSave }) => {
//     const [formData, setFormData] = useState({
//         type_name: '',
//         description: '',
//         image: null
//     });

//     useEffect(() => {
//         if (roomData) {
//             setFormData(roomData);
//         } else {
//             setFormData({ type_name: '', description: '', image: null });
//         }
//     }, [roomData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleFileChange = (e) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             image: e.target.files[0]
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         data.append('type_name', formData.type_name);
//         data.append('description', formData.description);
//         if (formData.image) data.append('image', formData.image);

//         onSave(data);
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>{roomData ? "Edit Room Type" : "Add Room Type"}</h2>
//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                     <label>
//                         Room Type Name:
//                         <input
//                             type="text"
//                             name="type_name"
//                             value={formData.type_name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                     <label>
//                         Description:
//                         <input
//                             type="text"
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                     <label>
//                         Image:
//                         <input
//                             type="file"
//                             name="image"
//                             onChange={handleFileChange}
//                         />
//                     </label>
//                     <div className="modal-buttons">
//                         <button type="submit">Save</button>
//                         <button type="button" onClick={onClose}>Cancel</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RoomModal;