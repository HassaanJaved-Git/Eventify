import React from "react";
import { Container, Navbar, Card } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div className=" text-white min-vh-100">
    

      {/* Profile Section */}
      <Container className="d-flex justify-content-center">
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
            <h4 className="mb-1 text-dark">Hassan Ajmal</h4>
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
  );
};

export default ProfilePage;
