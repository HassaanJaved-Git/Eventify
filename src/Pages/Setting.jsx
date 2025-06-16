import React, { useState, useEffect } from "react";
import { Nav, Tab, Row, Col } from "react-bootstrap";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const tabItems = [
  { eventKey: "account", title: "Account" },
  { eventKey: "notifications", title: "Notifications" },
  { eventKey: "privacy", title: "Privacy" },
  { eventKey: "security", title: "Security" },
  { eventKey: "billing", title: "Billing" },
  { eventKey: "help", title: "Help" },
  { eventKey: "about", title: "About" },
];

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname.split("/").pop();
    return tabItems.some((tab) => tab.eventKey === path) ? path : "account"; 
  });

  
  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { fromSettings: true } });
    }
  }, [token, navigate]);


  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (tabItems.some((tab) => tab.eventKey === path)) {
      setActiveTab(path);
    }
  }, [location.pathname]);

  return (
    <div
      className="container-Fluid py-5 text-light"
      style={{
        backgroundColor: "rgba(11, 11, 11, 0.1)",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-4 text-muted">Settings</h2>

      <Tab.Container activeKey={activeTab}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column mb-4">
              {tabItems.map((tab) => (
                <Nav.Item key={tab.eventKey}>
                  <Nav.Link
                    eventKey={tab.eventKey}
                    className="text-start text-light"
                    style={{
                      backgroundColor:
                        activeTab === tab.eventKey ? "#1c1c1c" : "transparent",
                    }}
                    onClick={() => {
                      setActiveTab(tab.eventKey);
                      navigate(`/settings/${tab.eventKey}`);
                    }}
                  >
                    {tab.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Outlet /> 
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}