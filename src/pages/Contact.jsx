
import "../assets/css/Contact.css";
import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Badge,
} from "react-bootstrap";
import {
  FaEnvelope,
  FaSearch,
  FaEye,
  FaTrashAlt,
  FaCalendarAlt,
  FaPhoneAlt,
  FaInbox,
  FaUsers,
  FaClock,
  FaArrowRight,
  FaFilter,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";


const messagesData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 98765 43210",
    subject: "Donation Enquiry",
    category: "Donation",
    message:
      "Hello, I would like to know more about your donation programs and how I can contribute to your foundation.",
    date: "29 July 2026",
    time: "10:42 AM",
  },
  {
    id: 2,
    name: "Priya Patil",
    email: "priya@gmail.com",
    phone: "+91 91234 56789",
    subject: "Volunteer Programme",
    category: "Volunteer",
    message:
      "I am interested in volunteering with your organization. Please let me know about the upcoming volunteer activities.",
    date: "28 July 2026",
    time: "04:15 PM",
  },
  {
    id: 3,
    name: "Amit Joshi",
    email: "amit@gmail.com",
    phone: "+91 99887 76655",
    subject: "Education Programme",
    category: "Programme",
    message:
      "I want to know more about the education initiatives conducted by your foundation for underprivileged children.",
    date: "27 July 2026",
    time: "11:20 AM",
  },
  {
    id: 4,
    name: "Sneha Deshmukh",
    email: "sneha@gmail.com",
    phone: "+91 98761 23456",
    subject: "General Enquiry",
    category: "General",
    message:
      "I would like to learn more about the work your organization is doing in the local community.",
    date: "26 July 2026",
    time: "09:35 AM",
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Contact() {
  const [messages, setMessages] = useState(messagesData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const categories = [
    "All",
    "Donation",
    "Volunteer",
    "Programme",
    "General",
  ];

  const filteredMessages = messages.filter((message) => {
    const searchMatch =
      message.name.toLowerCase().includes(search.toLowerCase()) ||
      message.email.toLowerCase().includes(search.toLowerCase()) ||
      message.subject.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || message.category === category;

    return searchMatch && categoryMatch;
  });

  const deleteMessage = () => {
    setMessages((prev) =>
      prev.filter((item) => item.id !== deleteId)
    );

    setDeleteId(null);
    setSelectedMessage(null);
  };

  return (
    <div className="contact-page">

      {/* HERO HEADER */}

      <div className="contact-hero">

        <div className="hero-content">

          <div className="hero-icon">
            <FaEnvelope />
          </div>

          <div>
            <span className="hero-label">
              COMMUNICATION CENTER
            </span>

            <h1>Contact Messages</h1>

            <p>
              Manage and review enquiries received from your website visitors.
            </p>
          </div>

        </div>

        <div className="hero-status">
          <FaCheckCircle />
          <div>
            <strong>Inbox Active</strong>
            <span>Receiving messages</span>
          </div>
        </div>

      </div>


      {/* STATISTICS */}

      <Row className="contact-stats">

        <Col xs={12} sm={6} xl={3}>
          <Card className="stat-card">
            <Card.Body>

              <div className="stat-icon blue">
                <FaInbox />
              </div>

              <div className="stat-info">
                <span>Total Messages</span>
                <h2>{messages.length}</h2>
              </div>

              <div className="stat-decoration" />

            </Card.Body>
          </Card>
        </Col>


        <Col xs={12} sm={6} xl={3}>
          <Card className="stat-card">
            <Card.Body>

              <div className="stat-icon red">
                <FaEnvelope />
              </div>

              <div className="stat-info">
                <span>New Enquiries</span>
                <h2>{messages.length}</h2>
              </div>

              <div className="stat-decoration red-decoration" />

            </Card.Body>
          </Card>
        </Col>


        <Col xs={12} sm={6} xl={3}>
          <Card className="stat-card">
            <Card.Body>

              <div className="stat-icon green">
                <FaClock />
              </div>

              <div className="stat-info">
                <span>Today's Messages</span>
                <h2>04</h2>
              </div>

              <div className="stat-decoration green-decoration" />

            </Card.Body>
          </Card>
        </Col>


        <Col xs={12} sm={6} xl={3}>
          <Card className="stat-card">
            <Card.Body>

              <div className="stat-icon purple">
                <FaUsers />
              </div>

              <div className="stat-info">
                <span>People Reached</span>
                <h2>128</h2>
              </div>

              <div className="stat-decoration purple-decoration" />

            </Card.Body>
          </Card>
        </Col>

      </Row>


      {/* MAIN INBOX */}

      <Card className="inbox-card">

        {/* TOP BAR */}

        <div className="inbox-header">

          <div className="inbox-heading">

            <div className="inbox-title-icon">
              <FaInbox />
            </div>

            <div>
              <h3>Message Inbox</h3>
              <p>
                {filteredMessages.length} enquiries available
              </p>
            </div>

          </div>


          <div className="inbox-search">

            <FaSearch />

            <Form.Control
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <FaTimes />
              </button>
            )}

          </div>

        </div>


        {/* FILTERS */}

        <div className="filter-bar">

          <div className="filter-label">
            <FaFilter />
            Filter:
          </div>

          <div className="filter-buttons">

            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? "active-filter" : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}

          </div>

        </div>


        {/* MESSAGE LIST */}

        <div className="messages-list">

          {filteredMessages.length > 0 ? (

            filteredMessages.map((message) => (

              <div
                className="message-card"
                key={message.id}
              >

                <div className="message-left">

                  <div className="sender-avatar">
                    {getInitials(message.name)}
                  </div>

                  <div className="message-content">

                    <div className="sender-row">

                      <div>
                        <h5>{message.name}</h5>
                        <span>{message.email}</span>
                      </div>

                      <Badge className="category-badge">
                        {message.category}
                      </Badge>

                    </div>

                    <h4>{message.subject}</h4>

                    <p>{message.message}</p>

                    <div className="message-meta">

                      <span>
                        <FaCalendarAlt />
                        {message.date}
                      </span>

                      <span>
                        {message.time}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="message-actions">

                  <Button
                    className="view-message"
                    onClick={() =>
                      setSelectedMessage(message)
                    }
                  >
                    <FaEye />
                    View
                    <FaArrowRight />
                  </Button>

                  <Button
                    className="delete-message"
                    onClick={() =>
                      setDeleteId(message.id)
                    }
                  >
                    <FaTrashAlt />
                  </Button>

                </div>

              </div>

            ))

          ) : (

            <div className="no-messages">

              <div className="no-message-icon">
                <FaEnvelope />
              </div>

              <h4>No Messages Found</h4>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>

      </Card>


      {/* VIEW MESSAGE MODAL */}

      <Modal
        show={!!selectedMessage}
        onHide={() => setSelectedMessage(null)}
        centered
        size="lg"
      >

        {selectedMessage && (

          <>

            <Modal.Header closeButton>
              <div>
                <span className="modal-label">
                  CONTACT ENQUIRY
                </span>

                <Modal.Title>
                  {selectedMessage.subject}
                </Modal.Title>
              </div>
            </Modal.Header>


            <Modal.Body>

              <div className="modal-sender">

                <div className="modal-avatar">
                  {getInitials(selectedMessage.name)}
                </div>

                <div>
                  <h5>{selectedMessage.name}</h5>
                  <span>{selectedMessage.email}</span>
                </div>

              </div>


              <div className="modal-details">

                <span>
                  <FaEnvelope />
                  {selectedMessage.email}
                </span>

                <span>
                  <FaPhoneAlt />
                  {selectedMessage.phone}
                </span>

                <span>
                  <FaCalendarAlt />
                  {selectedMessage.date}
                </span>

              </div>


              <div className="full-message">

                <label>MESSAGE</label>

                <p>
                  {selectedMessage.message}
                </p>

              </div>

            </Modal.Body>


            <Modal.Footer>

              <Button
                className="close-modal"
                onClick={() =>
                  setSelectedMessage(null)
                }
              >
                Close
              </Button>

              <Button
                className="delete-modal"
                onClick={() =>
                  setDeleteId(selectedMessage.id)
                }
              >
                <FaTrashAlt />
                Delete Message
              </Button>

            </Modal.Footer>

          </>

        )}

      </Modal>


      {/* DELETE MODAL */}

      <Modal
        show={deleteId !== null}
        onHide={() => setDeleteId(null)}
        centered
        size="sm"
      >

        <Modal.Body className="delete-confirmation">

          <div className="delete-confirm-icon">
            <FaTrashAlt />
          </div>

          <h4>Delete Message?</h4>

          <p>
            This message will be permanently removed from your inbox.
          </p>

          <div className="delete-confirm-actions">

            <Button
              onClick={() => setDeleteId(null)}
              className="cancel-delete"
            >
              Cancel
            </Button>

            <Button
              onClick={deleteMessage}
              className="confirm-delete"
            >
              Delete
            </Button>

          </div>

        </Modal.Body>

      </Modal>

    </div>
  );
}

export default Contact;