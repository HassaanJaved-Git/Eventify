import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ChildOfChild = ({ event, onDelete, onUpdate }) => {
  const token = localStorage.getItem("token");
  const [isEnlarged, setIsEnlarged] = useState(false);
  const navigate = useNavigate();
  const handleShowDetails = () => {
    setIsEnlarged(true);
  };

  const handleCloseDetails = () => {
    setIsEnlarged(false);
  };


const handleEditEvent = () => {
  navigate(`/edit-event/${event._id}`);
};


  const handleDeleteEvent = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    if (onDelete) {
      onDelete(event._id); // ✅ Notify parent ONLY
    }
  };

  return (
    <>
      <div className="card bg-dark text-white" style={{ width: '18rem' }} onClick={handleShowDetails}>
        <img src={event?.image?.imageURL} className="card-img-top" alt="Event" style={{ height: '150px' }} />
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
        </div>
      </div>

      {isEnlarged && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseDetails}
        >
          <div
            className="bg-dark text-white p-6 rounded-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2 text-white text-xl font-bold" onClick={handleCloseDetails}>
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">{event?.title}</h3>
            <img src={event?.image?.imageURL} className="w-full h-64 object-cover rounded mb-4" alt="Event" />
            <div className="card-text">
              <div>{event?.description}</div>
              <div>{event?.date}</div>
              <div>{event?.eventType}</div>
            </div>

            <button className="btn btn-primary mt-4 w-full" onClick={handleEditEvent}>
  Edit Event
</button>

            <button className="btn btn-danger mt-2 w-full" onClick={handleDeleteEvent}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChildOfChild;
