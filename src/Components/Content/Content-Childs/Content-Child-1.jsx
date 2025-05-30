import React from 'react'
import img from '../../../assets/calendar.png'
import Child1Child from './Child1-Childs/Child1-child'



const ContentChild1 = () => {
  return (
   <div className="col-lg-12 col-md-12 col-sm-12 col-12">
  <div className="bg-dark text-light text-left py-5 rounded card-lists">
    <Child1Child />
    <Child1Child />
    <Child1Child />
    {/* <img src={img} alt="empty events logo" className="mb-3 empty-image" height={'10px'} />
    <h3 className="mb-2">No Upcoming Events</h3>
    <p className="mb-4">You have no upcoming events. Why not host one?</p>
    <button className="btn btn-outline-light">+ Create Event</button> */}
  </div>
</div>
  )
}

export default ContentChild1
