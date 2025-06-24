import React, { useState, useEffect } from 'react';

const ChildOfChild = ({ event, onUpdate, onDelete }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    eventType: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date?.split('T')[0] || '',
        eventType: event.eventType || '',
      });
    }
  }, [event]);

  const handleShowDetails = () => setIsEnlarged(true);
  const handleCloseDetails = () => setIsEnlarged(false);
  const handleEditClick = () => {
    setIsEditing(true);
    setIsEnlarged(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('description', formData.description);
    updatedData.append('date', formData.date);
    updatedData.append('eventType', formData.eventType);

    if (selectedImage) {
      updatedData.append('image', selectedImage);
    }

    await onUpdate(event._id, updatedData);
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onDelete(event._id);
    }
  };

  return (
    <>
      {/* Event Card */}
      <div className="card bg-dark text-white" style={{ width: '18rem', cursor: 'pointer' }} onClick={handleShowDetails}>
        <img
          src={event?.image?.imageURL}
          className="card-img-top"
          alt="Event"
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
        </div>
      </div>

      {/* Event Detail Overlay */}
      {isEnlarged && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleCloseDetails}>
          <div className="bg-dark text-white p-6 rounded-lg max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-white text-xl font-bold" onClick={handleCloseDetails}>
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">{event?.title}</h3>
            <img src={event?.image?.imageURL} className="w-full h-64 object-cover rounded mb-4" alt="Event" />
            <div className="card-text mb-4">
              <p>{event?.description}</p>
              <p>{event?.date}</p>
              <p>{event?.eventType}</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success w-100" onClick={handleEditClick}>
                Update Event
              </button>
              <button className="btn btn-danger w-100" onClick={handleDeleteConfirm}>
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setIsEditing(false)}>
          <div className="bg-white text-black p-6 rounded w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Update Event</h3>

            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Event Type</label>
                <input
                  type="text"
                  name="eventType"
                  className="form-control"
                  value={formData.eventType}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Change Image (optional)</label>
                <input type="file" className="form-control" onChange={handleImageChange} />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChildOfChild;
