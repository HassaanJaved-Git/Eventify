import React, { useState } from 'react';
import im from '../../../../assets/prepared-wedding-hall.jpg';

const Child1Child = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`card mb-3 text-light ${isExpanded ? 'expanded-card' : ''}`}
      style={{cursor: 'pointer' }}
      onClick={toggleExpand}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img src={im} className="img-fluid rounded-start" alt="Event" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">Last updated 3 mins ago</small>
            </p>
            {isExpanded && (
              <div className="additional-details mt-3">
                <h6>Event Details</h6>
                <p><strong>Date:</strong> June 15, 2025</p>
                <p><strong>Time:</strong> 6:00 PM - 11:00 PM</p>
                <p><strong>Location:</strong> Grand Hall, City Center</p>
                <p><strong>Description:</strong> A beautiful wedding event with live music, dinner, and dancing. Join us to celebrate this special occasion!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Child1Child;