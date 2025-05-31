import React, { useState } from "react";
import { Nav, Tab, Row, Col } from "react-bootstrap";

const tabItems = [
  { eventKey: "account", title: "Account" },
];


export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="container py-5 text-light"style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", minHeight: "100vh", width: "53%" }}
>
      <h2 className="fw-bold mb-4 text-muted">Settings</h2>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column mb-4">
              {tabItems.map((tab) => (
                <Nav.Item key={tab.eventKey}>
                  <Nav.Link
                    eventKey={tab.eventKey}
                    className="text-start text-light"
                    style={{ backgroundColor: activeTab === tab.eventKey ? "#1c1c1c" : "transparent" }}
                  >
                    {tab.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="account">
                <AccountForm />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

function AccountForm() {
  const [profileImage, setProfileImage] = useState("https://i.imgur.com/bFzCzjW.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div>
      <h5 className="fw-bold mb-3 text-muted ">Your Profile</h5>
      <p className="text-muted">Choose how you are displayed as a host or guest.</p>

      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <label className="form-label text-muted">First Name</label>
          <input type="text" className="form-control  text-light border-secondary" defaultValue="Hassan" style={{ backgroundColor: "rgba(11, 11, 11, 0.1)"}} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label text-muted">Last Name</label>
          <input type="text" className="form-control  text-light border-secondary" defaultValue="Ajmal" style={{ backgroundColor: "rgba(11, 11, 11, 0.1)"}} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-muted">Username</label>
        <div className="input-group">
          <span className="input-group-text  text-secondary border-secondary" style={{ backgroundColor: "rgba(11, 11, 11, 0.1)"}}>@</span>
          <input type="text" className="form-control  text-light border-secondary" style={{ backgroundColor: "rgba(11, 11, 11, 0.1)"}} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-muted">Bio</label>
        <textarea
          className="form-control  text-light border-secondary"
          rows="3"
          placeholder="Share a little about your background and interests."
          style={{ backgroundColor: "rgba(11, 11, 11, 0.1)"}}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="form-label text-muted d-block">Profile Picture</label>
        <div className="position-relative d-inline-block">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle"
            width="100"
            height="100"
          />
          <label
            htmlFor="profileUpload"
            className="btn btn-light rounded-circle position-absolute"
            style={{ bottom: 0, right: 0, cursor: 'pointer' }}
          >
            ↑
          </label>
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
