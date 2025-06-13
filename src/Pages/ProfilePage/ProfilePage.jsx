import React from "react";
import { Container, Navbar, Card } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import ProfileChild1 from "./Profile-Childs/ProfileChild";

const ProfilePage = () => {
  return (
    <>
    <div className=" text-white my-4">
    

      {/* Profile Section */}
      <Container className="d-flex justify-content-center " style={{ width: "49%"}}>
        <Card className=" text-white p-4 rounded-4" style={{ width: "400px", backgroundColor:"rgba(180, 180, 180, 0.4)" }}>
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
       <div className='col-12 col-lg-10 col-md-10 col-sm-12 m-auto text-light Parent-div p-lg-5 p-md-3 p-sm-2'>
          <div className='col-12 d-flex justify-content-between align-items-center'>

           <div className='d-flex gap-2'>
           <button className='btn btn-primary'>My Events</button>
           <button className='btn btn-secondary'>Attended Events</button>
           </div>
           </div>

              
          <ProfileChild1 />
        </div>
      </>
  );
};

export default ProfilePage;
