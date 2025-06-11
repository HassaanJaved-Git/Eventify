import React, { useState, useEffect } from "react";
import SkeletonCard from "./Child1-Childs/Skeleton-Card";
import Child1Child from "./Child1-Childs/Child1-child";

const ContentChild1 = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/event/") // Replace with your actual backend URL
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
      <div className="bg-dark text-light text-left py-5 rounded card-lists">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </>
        ) : events.length > 0 ? (
          events.map((event) => (
  <Child1Child
    key={event._id}
    title={event.title}
    description={event.description}
    /* 👇 pick Cloudinary URL when present */
    image={
      event.image?.imageURL ||
      `http://localhost:5000/uploads/${event.image?.fileName}`
    }
    date={event.date}
    startTime={event.startTime}
    endTime={event.endTime}
    organizer={event.organizer?.name || 'Unknown'}
    location={event.location?.city || 'TBD'}
  />
))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default ContentChild1;
