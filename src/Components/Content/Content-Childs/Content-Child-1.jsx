import React from 'react'
import img from '../../../assets/calendar.png'

const ContentChild1 = () => {
  return (
   <div className="col-lg-12 col-md-12 col-sm-12 col-12">
  <div className="bg-dark text-light text-center py-5 rounded">
    <img src={img} alt="empty events logo" className="mb-3 empty-image" height={'10px'} />
    <h3 className="mb-2">No Upcoming Events</h3>
    <p className="mb-4">You have no upcoming events. Why not host one?</p>
    <button className="btn btn-outline-light">+ Create Event</button>
  </div>
</div>
  )
}

export default ContentChild1
