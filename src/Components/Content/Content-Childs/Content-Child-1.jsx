import React, { useState, useEffect } from "react";
import SkeletonCard from "./Child1-Childs/Skeleton-Card";
import Child1Child from "./Child1-Childs/Child1-child";

const ContentChild1 = ({ type }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [expandedEventId, setExpandedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const endpoint =
          type === "past"
            ? "http://localhost:5000/api/event/past-events"
            : "http://localhost:5000/api/event/";

        const response = await fetch(endpoint);
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [type]);

  return (
    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
      <div className="bg-dark text-light text-left py-5 rounded card-lists">
        {isLoading ? ( [...Array(3)].map((_, i) => <SkeletonCard key={i} />) ) 
          : events.length > 0 ? 
            (
              events.map((event) => (
                <Child1Child 
                  key={event._id} 
                  id={event._id} 
                  title={event.title} 
                  price= {event.price}
                  description={event.description} 
                  image={event.image?.imageURL} 
                  date={event.date} 
                  startTime={event.startTime} 
                  endTime={event.endTime} 
                  organizer={event.organizer?.name || "Unknown"} 
                  location={event.location?.city || "TBD"} 
                  expandedEventId={expandedEventId} 
                  setExpandedEventId={setExpandedEventId} 
                />
              ))
            ) 
          : (
            <p>No events found.</p>
          )
        }
      </div>
    </div>
  );
};

export default ContentChild1;
