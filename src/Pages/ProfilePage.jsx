import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sampleEvents } from '../data/sampleData';
import EventCard from '../Component/EventCard/EventCard';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Filter events based on active tab
    if (activeTab === 'upcoming') {
      setEvents(sampleEvents.filter(event => new Date(event.startDate) > new Date()));
    } else if (activeTab === 'past') {
      setEvents(sampleEvents.filter(event => new Date(event.startDate) < new Date()));
    } else {
      setEvents(sampleEvents);
    }
  }, [activeTab]);

  return (
    <div className="container py-4">
      <div className="profile-header">
        <div className="profile-cover" style={{ backgroundImage: `url(${user.coverPhoto})` }}></div>
        <div className="profile-avatar">
          <img src={user.avatar} alt={user.name} />
        </div>
      </div>
      
      <div className="text-center mb-5">
        <h1 className="fw-bold">{user.name}</h1>
        {user.bio && <p className="lead">{user.bio}</p>}
        
        <div className="d-flex justify-content-center gap-3 mt-3">
          {user.social.twitter && (
            <a href={`https://twitter.com/${user.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              <i className="bi bi-twitter me-1"></i>
              <span>@{user.social.twitter}</span>
            </a>
          )}
          
          {user.social.instagram && (
            <a href={`https://instagram.com/${user.social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              <i className="bi bi-instagram me-1"></i>
              <span>@{user.social.instagram}</span>
            </a>
          )}
          
          {user.social.website && (
            <a href={user.social.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              <i className="bi bi-globe me-1"></i>
              <span>Website</span>
            </a>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'upcoming' ? 'active fw-bold' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'past' ? 'active fw-bold' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past Events
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'all' ? 'active fw-bold' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Events
            </button>
          </li>
        </ul>
      </div>
      
      {events.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-calendar-x fs-1 text-muted"></i>
          </div>
          <h3>No {activeTab} events</h3>
          <p className="text-muted mb-4">
            {activeTab === 'upcoming' 
              ? "There are no upcoming events scheduled."
              : activeTab === 'past'
                ? "No past events to display."
                : "No events found."}
          </p>
          <Link to="/create-event" className="btn btn-primary">
            Create an Event
          </Link>
        </div>
      )}
      
      <div className="mt-5 text-center">
        <Link to="/create-event" className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i>
          Create New Event
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;