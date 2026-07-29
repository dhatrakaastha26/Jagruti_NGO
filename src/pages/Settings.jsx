import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  FaUser,
  FaBell,
  FaLock,
  FaPalette,
  FaGlobe,
  FaSave,
} from "react-icons/fa";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", name: "Profile Settings", icon: <FaUser /> },
    { id: "general", name: "General Settings", icon: <FaGlobe /> },
    { id: "notifications", name: "Notifications", icon: <FaBell /> },
    { id: "security", name: "Security", icon: <FaLock /> },
    { id: "appearance", name: "Appearance", icon: <FaPalette /> },
  ];

  return (
    <>
      <style>{`
        .settings-page {
          min-height: 100vh;
          background: #f7f8fc;
          padding: 30px;
        }

        .settings-card {
          border: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.06);
        }

        .settings-sidebar {
          background: #ffffff;
          padding: 20px;
          border-right: 1px solid #eeeeee;
        }

        .settings-menu {
          width: 100%;
          border: 0;
          background: transparent;
          padding: 12px 15px;
          margin-bottom: 8px;
          border-radius: 10px;
          text-align: left;
          color: #64748b;
          font-weight: 500;
        }

        .settings-menu:hover {
          background: #fff1f1;
          color: #e53935;
        }

        .settings-menu.active {
          background: #fee2e2;
          color: #dc2626;
          font-weight: 600;
        }

        .settings-content {
          padding: 35px;
          background: #ffffff;
          min-height: 600px;
        }

        .settings-heading {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
        }

        .settings-text {
          color: #64748b;
          font-size: 14px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        .form-control,
        .form-select {
          border-radius: 9px;
          padding: 10px 12px;
          border-color: #e2e8f0;
          box-shadow: none !important;
        }

        .save-button {
          background: #e53935;
          border: none;
          border-radius: 9px;
          padding: 10px 20px;
          font-weight: 600;
        }

        .save-button:hover {
          background: #c62828;
        }

        .setting-row {
          padding: 18px 0;
          border-bottom: 1px solid #eeeeee;
        }

        @media (max-width: 767px) {
          .settings-page {
            padding: 15px;
          }

          .settings-sidebar {
            border-right: 0;
            border-bottom: 1px solid #eeeeee;
            overflow-x: auto;
          }

          .settings-sidebar-inner {
            display: flex;
            min-width: 650px;
          }

          .settings-menu {
            width: auto;
            white-space: nowrap;
            margin-right: 5px;
          }

          .settings-content {
            padding: 25px 18px;
          }

          .settings-heading {
            font-size: 21px;
          }
        }
      `}</style>

      <div className="settings-page">
        <Container fluid>

          {/* Page Header */}
          <div className="mb-4">
            <h2 className="settings-heading mb-1">
              Settings
            </h2>

            <p className="settings-text mb-0">
              Manage your admin account and dashboard preferences.
            </p>
          </div>

          <Card className="settings-card">
            <Row className="g-0">

              {/* Sidebar */}
              <Col md={3} lg={3}>
                <div className="settings-sidebar">

                  <div className="settings-sidebar-inner">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`settings-menu ${
                          activeTab === item.id ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <span className="me-2">
                          {item.icon}
                        </span>

                        {item.name}
                      </button>
                    ))}
                  </div>

                </div>
              </Col>

              {/* Content */}
              <Col md={9} lg={9}>
                <div className="settings-content">

                  {/* PROFILE */}
                  {activeTab === "profile" && (
                    <div>
                      <h4 className="settings-heading">
                        Profile Settings
                      </h4>

                      <p className="settings-text mb-4">
                        Update your personal information.
                      </p>

                      <Row className="g-3">

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              First Name
                            </Form.Label>

                            <Form.Control
                              type="text"
                              placeholder="Enter first name"
                              defaultValue="Admin"
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Last Name
                            </Form.Label>

                            <Form.Control
                              type="text"
                              placeholder="Enter last name"
                              defaultValue="User"
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Email
                            </Form.Label>

                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Phone
                            </Form.Label>

                            <Form.Control
                              type="tel"
                              placeholder="Enter phone number"
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12}>
                          <Form.Group>
                            <Form.Label>
                              Bio
                            </Form.Label>

                            <Form.Control
                              as="textarea"
                              rows={4}
                              placeholder="Write your bio..."
                            />
                          </Form.Group>
                        </Col>

                      </Row>

                      <div className="text-end mt-4">
                        <Button className="save-button">
                          <FaSave className="me-2" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* GENERAL */}
                  {activeTab === "general" && (
                    <div>
                      <h4 className="settings-heading">
                        General Settings
                      </h4>

                      <p className="settings-text mb-4">
                        Manage your website's general information.
                      </p>

                      <Row className="g-3">

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Website Name
                            </Form.Label>

                            <Form.Control
                              defaultValue="Jagruti Foundation"
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Website Email
                            </Form.Label>

                            <Form.Control
                              type="email"
                              placeholder="info@example.com"
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Language
                            </Form.Label>

                            <Form.Select>
                              <option>English</option>
                              <option>Marathi</option>
                              <option>Hindi</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Timezone
                            </Form.Label>

                            <Form.Select>
                              <option>India Standard Time</option>
                              <option>UTC</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

                      </Row>

                      <div className="text-end mt-4">
                        <Button className="save-button">
                          <FaSave className="me-2" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* NOTIFICATIONS */}
                  {activeTab === "notifications" && (
                    <div>
                      <h4 className="settings-heading">
                        Notifications
                      </h4>

                      <p className="settings-text mb-4">
                        Manage the notifications you want to receive.
                      </p>

                      <div className="setting-row d-flex justify-content-between align-items-center">
                        <div>
                          <strong>New User Registration</strong>
                          <p className="settings-text mb-0">
                            Notify me when a new user registers.
                          </p>
                        </div>

                        <Form.Check
                          type="switch"
                          defaultChecked
                        />
                      </div>

                      <div className="setting-row d-flex justify-content-between align-items-center">
                        <div>
                          <strong>New Volunteer</strong>
                          <p className="settings-text mb-0">
                            Notify me about new volunteer registrations.
                          </p>
                        </div>

                        <Form.Check
                          type="switch"
                          defaultChecked
                        />
                      </div>

                      <div className="setting-row d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Program Updates</strong>
                          <p className="settings-text mb-0">
                            Receive updates about programs.
                          </p>
                        </div>

                        <Form.Check type="switch" />
                      </div>

                      <div className="text-end mt-4">
                        <Button className="save-button">
                          <FaSave className="me-2" />
                          Save Preferences
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* SECURITY */}
                  {activeTab === "security" && (
                    <div>
                      <h4 className="settings-heading">
                        Security
                      </h4>

                      <p className="settings-text mb-4">
                        Change your password and manage account security.
                      </p>

                      <Row className="g-3">

                        <Col xs={12}>
                          <Form.Group>
                            <Form.Label>
                              Current Password
                            </Form.Label>

                            <Form.Control
                              type="password"
                              placeholder="Enter current password"
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              New Password
                            </Form.Label>

                            <Form.Control
                              type="password"
                              placeholder="Enter new password"
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Confirm Password
                            </Form.Label>

                            <Form.Control
                              type="password"
                              placeholder="Confirm password"
                            />
                          </Form.Group>
                        </Col>

                      </Row>

                      <div className="text-end mt-4">
                        <Button className="save-button">
                          <FaLock className="me-2" />
                          Update Password
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* APPEARANCE */}
                  {activeTab === "appearance" && (
                    <div>
                      <h4 className="settings-heading">
                        Appearance
                      </h4>

                      <p className="settings-text mb-4">
                        Customize your dashboard appearance.
                      </p>

                      <div className="setting-row d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Dark Mode</strong>
                          <p className="settings-text mb-0">
                            Enable dark mode for the dashboard.
                          </p>
                        </div>

                        <Form.Check type="switch" />
                      </div>

                      <div className="setting-row">
                        <Form.Label>
                          Dashboard Theme
                        </Form.Label>

                        <Form.Select>
                          <option>Red & Navy</option>
                          <option>Green & Navy</option>
                          <option>Purple & Navy</option>
                        </Form.Select>
                      </div>

                      <div className="setting-row">
                        <Form.Label>
                          Sidebar Style
                        </Form.Label>

                        <Form.Select>
                          <option>Fixed Sidebar</option>
                          <option>Collapsible Sidebar</option>
                        </Form.Select>
                      </div>

                      <div className="text-end mt-4">
                        <Button className="save-button">
                          <FaSave className="me-2" />
                          Save Appearance
                        </Button>
                      </div>
                    </div>
                  )}

                </div>
              </Col>

            </Row>
          </Card>

        </Container>
      </div>
    </>
  );
};

export default Settings;