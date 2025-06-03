import {React,useState,useEffect} from 'react'
// import img from '../../../assets/calendar.png'
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
          data.map((user) => <Child1Child key={user.id} user={user} />)
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default ContentChild1
