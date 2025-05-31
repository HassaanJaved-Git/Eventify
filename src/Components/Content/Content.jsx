import React from 'react'
import '../../Allcss/Content.css'
import ContentChild1 from './Content-Childs/Content-Child-1'


const Content = () => {
  return (
    <>
    <div className='container-fluid Content-main'>
        <div className='col-12 col-lg-10 col-md-10 col-sm-12 m-auto text-light Parent-div p-lg-5 p-md-3 p-sm-2'>
          <div className='col-12 d-flex justify-content-between align-items-center'>
           <h1 className='mb-0'>Events</h1>

           <div className='d-flex gap-2'>
           <button className='btn btn-primary'>Upcomings</button>
           <button className='btn btn-secondary'>Past</button>
           </div>
           </div>

           <ContentChild1 />
        </div>
    </div>
    </>

  )
}

export default Content
