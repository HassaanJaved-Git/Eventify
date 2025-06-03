import {React,useState,useEffect} from 'react'
// import img from '../../../assets/calendar.png'
import im from '../../../assets/prepared-wedding-hall.jpg'
import im2 from '../../../assets/event-pictures/e1.jpg';
import im3 from '../../../assets/event-pictures/e2.jpg';
import im4 from '../../../assets/event-pictures/e3.jpg';
import im5 from '../../../assets/event-pictures/e4.jpg';
import im6 from '../../../assets/event-pictures/e5.jpg';
import im7 from '../../../assets/event-pictures/e6.jpg';
import im8 from '../../../assets/event-pictures/e7.jpg';
import im9 from '../../../assets/event-pictures/e8.jpg';
import im10 from '../../../assets/event-pictures/e9.jpg';

const images = [im,im2,im3,im4,im5,im6,im7,im8,im9,im10];

import SkeletonCard from './Child1-Childs/Skeleton-Card'
import Child1Child from './Child1-Childs/Child1-child'



const ContentChild1 = () => {

  const [data , setData] = useState(null);
  const [isLoading,setLoading] = useState(true);
  useEffect(()=>{
    setLoading(true);

    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res=>res.json()))
    .then((data)=>{
      setData(data)
      setLoading(false)
    })
    
  },[])



    return (
    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
      <div className="bg-dark text-light text-left py-5 rounded card-lists">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </>
        ) : data && data.length > 0 ? (
          data.map((user, index) => (
            <Child1Child
              key={user.id}
              user={user}
              image={images[index % images.length]} // Pass image cyclically
            />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default ContentChild1
