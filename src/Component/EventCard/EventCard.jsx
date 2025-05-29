import { Link } from 'react-router-dom';

function EventCard({ event }) {
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  return (
    <div className="col">
      <div className="card event-card shadow-sm h-100">
        <img 
          src={event.coverImage} 
          className="card-img-top" 
          alt={event.title} 
        />
        
        <div className="card-body d-flex flex-column">
          <div className="d-flex align-items-center mb-2">
            <div className="badge bg-light text-dark me-2">
              {event.type}
            </div>
            {event.isPrivate && (
              <div className="badge bg-secondary text-white">
                Private
              </div>
            )}
          </div>
          
          <h5 className="card-title">
            <Link to={`/event/${event.id}`} className="text-decoration-none text-dark">
              {event.title}
            </Link>
          </h5>
          
          <div className="mb-2 event-time">
            <i className="bi bi-calendar me-2"></i>
            {formatDate(event.startDate)}
            {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
          </div>
          
          <div className="mb-3 event-time">
            <i className="bi bi-clock me-2"></i>
            {formatTime(event.startDate)}
          </div>
          
          <div className="mb-3 event-location">
            <i className={`bi ${event.location.type === 'online' ? 'bi-globe' : 'bi-geo-alt'} me-2`}></i>
            {event.location.name}
          </div>
          
          <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img 
                src={event.host.avatar} 
                alt={event.host.name} 
                className="rounded-circle me-2" 
                width="24" 
                height="24" 
              />
              <span className="small text-muted">{event.host.name}</span>
            </div>
            
            <div>
              {event.attendees > 0 && (
                <span className="small text-muted">
                  <i className="bi bi-people me-1"></i>
                  {event.attendees}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;