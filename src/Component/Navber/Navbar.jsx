import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Dropdown, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Background from "three/src/renderers/common/Background.js";

import { AuthContext } from "../../Context/AuthContext"; // Make sure casing is correct

const MyNavbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect after logout
  };

  return (
    <Navbar expand="lg" className="py-3" style={{background: "transparent"}}>
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="text-primary fw-bold">
          Eventify
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto" />

          {/* Right side */}
          <div className="d-flex align-items-center gap-3">
            {/* Create Event button if logged in */}
            {isLoggedIn && (
              <Button
                as={Link}
                to="/create-event"
                variant="primary"
                className="px-3"
                style={{ backgroundColor: "#a78bfa", border: "none" }}
                
              >
                Create Event
              </Button>
            )}

            {/* User Dropdown or Login */}
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="d-flex align-items-center border-0"
                >
                  <Image
                    src="https://via.placeholder.com/32"
                    roundedCircle
                    width="32"
                    height="32"
                    className="me-2"
                  />
                  <span className="text-primary fw-semibold">User</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
              <Button
                as={Link}
                to="/signup"
                variant="outline-primary"
                className="px-3"
              >
                SignUp
              </Button>
              
              <Button
                as={Link}
                to="/login"
                variant="outline-primary"
                className="px-3"
              >
                Login
              </Button>
              </>

            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
