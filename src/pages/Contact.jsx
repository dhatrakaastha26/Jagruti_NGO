import axios from "axios";
import "../assets/css/Contact.css";
import React, { useState , useEffect } from "react";
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




const getInitials = (Name = "") => {
  if (!Name) return "?";

  return Name.split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};
function Contact() {
  const [messages, setMessages] = useState([]);
 const [loading, setLoading] = useState(false);
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
  const getMessages = async () => {
  try {
    const response = await axios.get("http://localhost:8000/getContact");

    setMessages(response.data);

  } catch (error) {
    console.log(error);
    alert("Unable to fetch messages.");
  }
};
useEffect(() => {
  getMessages();
}, []);

 const filteredMessages = messages.filter((message) => {
  const searchText = search.toLowerCase();

  return (
    (message.Name || "").toLowerCase().includes(searchText) ||
    (message.Email || "").toLowerCase().includes(searchText) ||
    (message.Subject || "").toLowerCase().includes(searchText)
  );
});

  const deleteMessage = async () => {
  try {
    await axios.delete(
      `http://localhost:8000/deleteContact/${deleteId}`
    );

    setMessages((prev) =>
      prev.filter((item) => item._id !== deleteId)
    );

    setDeleteId(null);
    setSelectedMessage(null);

    alert("Message deleted successfully.");
  } catch (error) {
    console.log(error);
    alert("Unable to delete message.");
  }
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
              
            />

            {search && (
              <button >
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
                key={message._id}
              >

                <div className="message-left">

                  <div className="sender-avatar">
                    {getInitials(message.Name)}
                  </div>

                  <div className="message-content">

                    <div className="sender-row">

                      <div>
                        <h5>{message.Name}</h5>
                        <span>{message.Email}</span>
                      </div>

                      <Badge className="category-badge">
                        {message.category}
                      </Badge>

                    </div>

                    <h4>{message.Subject}</h4>

                    <p>{message.Message}</p>


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
                      setDeleteId(message._id)
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
                  {selectedMessage.Subject}
                </Modal.Title>
              </div>
            </Modal.Header>


            <Modal.Body>

              <div className="modal-sender">

                <div className="modal-avatar">
                  {getInitials(selectedMessage.Name)}
                </div>

                <div>
                  <h5>{selectedMessage.Name}</h5>
                  <span>{selectedMessage.Email}</span>
                </div>

              </div>


              <div className="modal-details">

                <span>
                  <FaEnvelope />
                  {selectedMessage.Email}
                </span>

                <span>
                  <FaPhoneAlt />
                  {selectedMessage.Phone}
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
                  setDeleteId(selectedMessage._id)
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
              onClick={() => setDeleteId(_id)}
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