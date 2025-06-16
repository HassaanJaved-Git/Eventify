import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Nav, Tab, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const tabItems = [
  { eventKey: "account", title: "Account" },
  { eventKey: "notifications", title: "Notifications" },
  { eventKey: "privacy", title: "Privacy" },
  { eventKey: "security", title: "Security" },
  { eventKey: "billing", title: "Billing" },
  { eventKey: "help", title: "Help" },
  { eventKey: "about", title: "About" }
];

export default function Settings() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
      if (!token) {
    navigate("/login", {
      state: { fromSettings: true }
    });
  }
  }, []);

  
  const [activeTab, setActiveTab] = useState("account");

  const renderTabContent = (key) => {
    switch (key) {
      case "account":
        return <AccountTab />;
      case "notifications":
        return <NotificationsTab />;
      case "privacy":
        return <PrivacyTab />;
      case "security":
        return <SecurityTab />;
      case "billing":
        return <BillingTab />;
      case "help":
        return <HelpTab />;
      case "about":
        return <AboutTab />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div
      className="container py-5 text-light"
      style={{
        backgroundColor: "rgba(11, 11, 11, 0.1)",
        minHeight: "100vh",
        width: "53%"
      }}
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
                    style={{
                      backgroundColor:
                        activeTab === tab.eventKey ? "#1c1c1c" : "transparent"
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
              <Tab.Pane eventKey={activeTab}>
                {renderTabContent(activeTab)}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

function AccountTab() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", {
      state: { fromSettings: true }
    });
  };

  const delAccount = async () => {
    const token = localStorage.getItem("token");

    const userConfirmed  = window.confirm("Are you really want to delete account")
    if ( userConfirmed  ) {
      try {

        await axios.delete("http://localhost:5000/api/user/delete", {
          headers: {
            Authorization: `Bearer ${(token)}`
          }
        });
        localStorage.removeItem("token");
        logout();
      } catch {
        console.error("Error deleting account");
        alert("Failed to delete account. Please try again later.");
      }
    }
  }

  return (
    <div>
      <h4 className="mb-3">Profile Settings</h4>
      <p className="mb-3">Manage your profile information and preferences.</p>
      
      <button className="btn btn-danger mb-3" onClick={logout}>
        Logout
      </button>
      <hr />
      <button className="btn btn-danger mb-3"  onClick={delAccount}>
        Delete Account
      </button>
    </div>
  );
}

function NotificationsTab() {
  return <div><h4>Notifications Settings</h4><p>Manage email and app alerts.</p></div>;
}

function PrivacyTab() {
  return <div><h4>Privacy Settings</h4><p>Control who sees your data.</p></div>;
}

function SecurityTab() {
  return <div><h4>Security Settings</h4><p>Update password, 2FA and more.</p></div>;
}

function BillingTab() {
  return <div><h4>Billing Information</h4><p>View and manage your invoices.</p></div>;
}

function HelpTab() {
  return <div><h4>Help & Support</h4><p>FAQs, contact support and tutorials.</p></div>;
}

function AboutTab() {
  return <div><h4>About</h4><p>Learn more about this platform.</p></div>;
}
