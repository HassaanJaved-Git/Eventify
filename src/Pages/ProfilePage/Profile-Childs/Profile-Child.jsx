import React, { useState } from 'react';

const ChildOfChild = ({ user, image }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleShowDetails = () => {
    setIsEnlarged(true);
  };

  const handleCloseDetails = () => {
    setIsEnlarged(false);
  };

  return (
    <>
      {/* Card Component */}
      <div className="card bg-dark text-white" style={{ width: '18rem' }} onClick={handleShowDetails}>
        <img src={image} className="card-img-top" alt="Event Picture" />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
        </div>
      </div>

      {/* Enlarged Details Overlay (always rendered) */}
      <div
        className={`overlay fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50
          ${isEnlarged ? 'overlay-show' : 'overlay-hide'}`}
        onClick={handleCloseDetails}
      >
        <div
          className="overlay-content bg-dark text-white p-6 rounded-lg max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-white text-xl font-bold"
            onClick={handleCloseDetails}
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold mb-4">{user.name}</h3>
          <img
            src={image}
            className="w-full h-64 object-cover rounded mb-4"
            alt="Event Picture"
          />
          <div className="card-text">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio || 'No bio available.'}</p>
            <p><strong>Date:</strong> 16 May 2025</p>
            <p><strong>Last Date:</strong> 17 May 2025</p>
          </div>
          <button
            className="btn btn-primary mt-4 w-full"
            onClick={handleCloseDetails}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ChildOfChild;
