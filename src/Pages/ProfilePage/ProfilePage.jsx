import { React, useState, useEffect } from "react";

import { Container, Navbar, Card } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
// import ProfileChild1 from "./Profile-Childs/ProfileChild";
// import img from '../../../assets/calendar.png'
import im from "../../assets/prepared-wedding-hall.jpg";
import im2 from "../../assets/event-pictures/e1.jpg";
import im3 from "../../assets/event-pictures/e2.jpg";
import im4 from "../../assets/event-pictures/e3.jpg";
import im5 from "../../assets/event-pictures/e4.jpg";
import im6 from "../../assets/event-pictures/e5.jpg";
import im7 from "../../assets/event-pictures/e6.jpg";
import im8 from "../../assets/event-pictures/e7.jpg";
import im9 from "../../assets/event-pictures/e8.jpg";
import im10 from "../../assets/event-pictures/e9.jpg";

const images = [im, im2, im3, im4, im5, im6, im7, im8, im9, im10];

import SkeletonCard from "../../Components/Content/Content-Childs/Child1-Childs/Skeleton-Card";
import ChildOfChild from "./Profile-Childs/Profile-Child";

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className=" text-white my-4">
        {/* Profile Section */}
        <Container
          className="d-flex justify-content-center "
          style={{ width: "49%" }}
        >
          <Card
            className=" text-white p-4 rounded-4"
            style={{
              width: "400px",
              backgroundColor: "rgba(180, 180, 180, 0.4)",
            }}
          >
            <div className="d-flex flex-column align-items-center">
              {/* Avatar */}
              <div
                className="rounded-circle d-flex justify-content-center align-items-center mb-3"
                style={{
                  width: "130px",
                  height: "130px",
                  background: "linear-gradient(135deg, #e5d4ff, #bcaaff)",
                  fontSize: "45px",
                }}
              >
                😊
              </div>

              {/* User Info */}
              <h4 className="mb-1 text-dark">User Name</h4>
              <p className="text-muted mb-3">
                <FaCalendarAlt className="me-1" />
                Joined May 2025
              </p>

              {/* Stats */}
              <div className="d-flex justify-content-between w-75 text-muted">
                <span>
                  <strong>0</strong> Hosted
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
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <button className="btn btn-primary">My Events</button>
            <button className="btn btn-secondary">Attended Events</button>
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="bg-dark text-light text-left py-5 rounded profile-events-list">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </>
            ) : data && data.length > 0 ? (
              data.map((user, index) => (
                <ChildOfChild
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
      </div>
    </>
  );
};

export default ProfilePage;
