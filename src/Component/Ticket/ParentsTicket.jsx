import React from 'react';
import TicketCard from './ChildTicket/Ticket';

const App = () => {
  const TicketData = {
    eventName: 'Cyberfest 2025',
    date: 'May 3, 2025, 9:00 AM GMT+5',
    location: 'Lahore Garrison University, Main Campus, Sector C, DHA Phase 6, Lahore, Pakistan',
    attendee: 'Muhammad Hasan ...',
    status: 'Going',
    ticketType: '1x Standard'
  };

  return (
    <div className="App">
      <TicketCard {...TicketData} />
    </div>
  );
};

export default App;