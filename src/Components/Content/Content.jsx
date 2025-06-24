import React, { useState } from 'react';
import '../../Allcss/Content.css';
import ContentChild1 from './Content-Childs/Content-Child-1';
import { Helmet } from 'react-helmet';

const Content = () => {
  const [eventType, setEventType] = useState('upcoming'); // 'upcoming' or 'past'

  const toggleEventType = () => {
    setEventType(prev => (prev === 'upcoming' ? 'past' : 'upcoming'));
  };

  return (
    <>
    <Helmet>
      <title>Eventify</title>
    </Helmet>
    <div className='container-fluid Content-main'>
      <div className='main-container col-12 col-lg-10 col-md-10 col-sm-12 m-auto text-light Parent-div p-lg-5 p-md-3 p-sm-2'>
        <div className='col-12 d-flex justify-content-between align-items-center'>
          <h1 className='mb-0'>Events</h1>

          <button
            className={`btn ${eventType === 'upcoming' ? 'btn-secondary' : 'btn-primary'}`}
            onClick={toggleEventType}
          >
            {eventType === 'upcoming' ? 'Past Events' : 'Upcoming Events'}
          </button>
        </div>

        <ContentChild1 type={eventType} />
      </div>
    </div>
    </>
  );
};

export default Content;
