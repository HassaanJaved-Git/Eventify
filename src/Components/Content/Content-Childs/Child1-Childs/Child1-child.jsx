import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Child1Child = ({ id, title, description,price, image, date, startTime, endTime, organizer, location, expandedEventId, setExpandedEventId }) => {
  const isExpanded = expandedEventId === id;
  const [ticketId, setTicketId] = useState();

  const toggleExpand = () => {
    setExpandedEventId(isExpanded ? null : id);
  };


  const navigate = useNavigate();


  const handleBuyNow = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to purchase tickets.");
      navigate("/login");
      return;
    }
    if(price == 0){
      const response = await axios.post(
      `http://localhost:5000/api/ticket/book-ticket`, 
      {eventId: id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      
    );
    console.log("Purchase successful:", response.data);
    alert("Purchase successful!");
   const ticketId = response.data.ticketId; // ✅ Use correct field
      setTicketId(ticketId);
      navigate(`/ticket/${ticketId}`);
    }
    else{
     navigate(`/stripe`) 
    }
    
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Purchase failed. Please try again.";
    console.error(errorMessage);
    alert(errorMessage);
  }
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
            <p>Rs {price}/<small className='small'> ticket</small></p>
             <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
            <p className="card-text">
              <small className="text-body-light">Event by {organizer}</small>
            </p>
      {/* Buy Now Button - Top Right */}
<button 
  className="btn btn-primary position-absolute top-0 end-0 m-2"
  style={{ zIndex: 1 }}
  onClick={(e) => {
    e.stopPropagation(); 
    handleBuyNow();      
  }}
>
  Buy Now
</button>
            {isExpanded && (
              <div className="additional-details mt-3">
                <h6>Event Details</h6>
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
