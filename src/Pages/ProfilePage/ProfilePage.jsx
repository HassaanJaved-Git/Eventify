import { React, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Card } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";

import defaultUserPic from '../../assets/user.png'

import SkeletonCard from "../../Components/Content/Content-Childs/Child1-Childs/Skeleton-Card";
import ChildOfChild from "./Profile-Childs/Profile-Child";

const ProfilePage = () => {
  const navigate = useNavigate()
  const { userName } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${userName}`);
        setData(res.data); 
      } catch (err) {
        if (err.response && err.response.status === 404) {
          navigate('/404');
        } else {
          console.error("Error fetching user data:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userName]);

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className=" text-white my-4">
        <Container
          className="d-flex justify-content-center "
          style={{ width: "49%" }}
        >
          <Card className=" text-white p-4 rounded-4" style={{ width: "400px", backgroundColor: "rgba(180, 180, 180, 0.4)" }} >
            <div className="d-flex flex-column align-items-center">
              <div className="rounded-circle d-flex justify-content-center align-items-center mb-3" style={{ width: "130px", height: "130px", background: "linear-gradient(135deg, #e5d4ff, #bcaaff)", fontSize: "45px", overflow: "hidden", position: "relative", }} >
                <img src={data?.user?.profileImage?.imageURL || defaultUserPic} alt={data?.user?.userName} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              </div>

              <h4 className="mb-1 text-dark">{data?.user?.userName}</h4>
              <p className="text-muted mb-3">
                <FaCalendarAlt className="me-1" />
                {data?.user?.createdAt}
              </p>

              <div className="d-flex justify-content-between w-75 text-muted">
                <span>
                  <strong>{data?.eventsCount}</strong> Hosted
                </span>
                <span>
                  <strong>0</strong> Attended
                </span>
              </div>
            </div>
          </Card>
        </Container>
      </div>
      <div className="col-12 col-lg-10 col-md-10 col-sm-12 m-auto text-light Parent-div p-lg-5 p-md-3 p-sm-2">

        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="bg-dark text-light text-left py-5 rounded profile-events-list">
          {isLoading ? (
            <>
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </>
          ) : data?.events?.length > 0 ? (
            data.events.map((event) => (
              <ChildOfChild key={event._id} event={event} />
            ))
          ) : (
            <p>No Event Hosted.</p>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
