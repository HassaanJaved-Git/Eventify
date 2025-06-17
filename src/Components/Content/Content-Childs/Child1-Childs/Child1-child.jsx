import React from 'react';

const Child1Child = ({ id, title, description, image, date, startTime, endTime, organizer, location, expandedEventId, setExpandedEventId }) => {
  const isExpanded = expandedEventId === id;

  const toggleExpand = () => {
    setExpandedEventId(isExpanded ? null : id);
  };

  return (
    <div className={`card mb-3 text-light ${isExpanded ? 'expanded-card' : ''}`} style={{ cursor: 'pointer', minHeight: '250px' }} onClick={toggleExpand} >
      <div className="row g-0">
        <div className="col-md-4" style={{ height: '250px' }}>
          <img style={{ height: '100%' }} src={image} className="img-fluid rounded-start" alt="Event" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description.slice(0, 100)}...</p>
            <p className="card-text">
              <small className="text-body-light">Event by {organizer}</small>
            </p>

            {isExpanded && (
              <div className="additional-details mt-3">
                <h6>Event Details</h6>
                <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {startTime} - {endTime}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Description:</strong> {description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Child1Child;
