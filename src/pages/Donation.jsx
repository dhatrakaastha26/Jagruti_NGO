import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Badge,
} from "react-bootstrap";

import {
  FaDonate,
  FaUsers,
  FaSearch,
  FaEye,
  FaCalendarAlt,
  FaReceipt,
  FaCheckCircle,
  FaArrowRight,
  FaRupeeSign,
  FaTimes,
} from "react-icons/fa";

import "../assets/css/Donation.css";


const donationsData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 98765 43210",
    amount: "₹5,000",
    transactionId: "TXN20260729001",
    date: "29 July 2026",
    time: "10:42 AM",
    message:
      "Happy to contribute towards the education programme and support the children.",
  },
  {
    id: 2,
    name: "Priya Patil",
    email: "priya@gmail.com",
    phone: "+91 91234 56789",
    amount: "₹10,000",
    transactionId: "TXN20260728002",
    date: "28 July 2026",
    time: "04:15 PM",
    message:
      "I am glad to support the wonderful work being done by your foundation.",
  },
  {
    id: 3,
    name: "Amit Joshi",
    email: "amit@gmail.com",
    phone: "+91 99887 76655",
    amount: "₹2,500",
    transactionId: "TXN20260727003",
    date: "27 July 2026",
    time: "11:20 AM",
    message:
      "Keep doing great work for the community. Best wishes to the entire team.",
  },
  {
    id: 4,
    name: "Sneha Deshmukh",
    email: "sneha@gmail.com",
    phone: "+91 98761 23456",
    amount: "₹7,500",
    transactionId: "TXN20260726004",
    date: "26 July 2026",
    time: "09:35 AM",
    message:
      "I would like to contribute towards your community development programmes.",
  },
];


const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();


function Donations() {

  const [donations] = useState(donationsData);

  const [search, setSearch] = useState("");

  const [selectedDonation, setSelectedDonation] = useState(null);


  const filteredDonations = donations.filter((donation) => {

    const searchText = search.toLowerCase();

    return (
      donation.name.toLowerCase().includes(searchText) ||
      donation.email.toLowerCase().includes(searchText) ||
      donation.transactionId.toLowerCase().includes(searchText)
    );

  });


  return (

    <div className="donations-page">


      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="donation-hero">

        <div className="donation-hero-content">

          <div className="donation-hero-icon">
            <FaDonate />
          </div>

          <div>

            <span className="donation-label">
              DONATION MANAGEMENT
            </span>

            <h1>Donations</h1>

            <p>
              Manage and monitor contributions received through your website.
            </p>

          </div>

        </div>


        <div className="online-payment-status">

          <FaCheckCircle />

          <div>
            <strong>Online Payments</strong>
            <span>Payment system active</span>
          </div>

        </div>

      </div>


      {/* =========================================
          STATISTICS
      ========================================= */}

      <Row className="donation-stats">


        <Col xs={12} sm={6} xl={3}>

          <Card className="donation-stat-card">

            <Card.Body>

              <div className="donation-stat-icon blue">
                <FaRupeeSign />
              </div>

              <div className="donation-stat-info">

                <span>Total Donations</span>

                <h2>₹35,000</h2>

              </div>

              <div className="stat-line blue-line" />

            </Card.Body>

          </Card>

        </Col>


        <Col xs={12} sm={6} xl={3}>

          <Card className="donation-stat-card">

            <Card.Body>

              <div className="donation-stat-icon red">
                <FaDonate />
              </div>

              <div className="donation-stat-info">

                <span>Today's Donations</span>

                <h2>₹5,000</h2>

              </div>

              <div className="stat-line red-line" />

            </Card.Body>

          </Card>

        </Col>


        <Col xs={12} sm={6} xl={3}>

          <Card className="donation-stat-card">

            <Card.Body>

              <div className="donation-stat-icon green">
                <FaCalendarAlt />
              </div>

              <div className="donation-stat-info">

                <span>This Month</span>

                <h2>₹35,000</h2>

              </div>

              <div className="stat-line green-line" />

            </Card.Body>

          </Card>

        </Col>


        <Col xs={12} sm={6} xl={3}>

          <Card className="donation-stat-card">

            <Card.Body>

              <div className="donation-stat-icon purple">
                <FaUsers />
              </div>

              <div className="donation-stat-info">

                <span>Total Donors</span>

                <h2>{donations.length}</h2>

              </div>

              <div className="stat-line purple-line" />

            </Card.Body>

          </Card>

        </Col>


      </Row>


      {/* =========================================
          DONATION RECORDS
      ========================================= */}

      <Card className="donation-record-card">


        {/* HEADER */}

        <div className="donation-record-header">


          <div className="record-title">

            <div className="record-icon">
              <FaReceipt />
            </div>

            <div>

              <h3>Donation Records</h3>

              <p>
                {filteredDonations.length} donation records available
              </p>

            </div>

          </div>


          {/* SEARCH */}

          <div className="donation-search">

            <FaSearch />

            <Form.Control
              type="text"
              placeholder="Search donor, email or transaction ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (

              <button
                onClick={() => setSearch("")}
              >
                <FaTimes />
              </button>

            )}

          </div>


        </div>


        {/* TABLE HEADER */}

        <div className="donation-table-header">

          <span>DONOR</span>

          <span>AMOUNT</span>

          <span>TRANSACTION ID</span>

          <span>DATE</span>

          <span>PAYMENT</span>

          <span>ACTION</span>

        </div>


        {/* DONATION LIST */}

        <div className="donation-list">


          {filteredDonations.length > 0 ? (

            filteredDonations.map((donation) => (

              <div
                className="donation-row"
                key={donation.id}
              >


                {/* DONOR */}

                <div className="donor-info">

                  <div className="donor-avatar">

                    {getInitials(donation.name)}

                  </div>

                  <div>

                    <h5>{donation.name}</h5>

                    <span>{donation.email}</span>

                  </div>

                </div>


                {/* AMOUNT */}

                <div className="donation-amount">

                  <strong>
                    {donation.amount}
                  </strong>

                </div>


                {/* TRANSACTION */}

                <div className="transaction-id">

                  <span>
                    {donation.transactionId}
                  </span>

                </div>


                {/* DATE */}

                <div className="donation-date">

                  <strong>
                    {donation.date}
                  </strong>

                  <span>
                    {donation.time}
                  </span>

                </div>


                {/* PAYMENT */}

                <div className="payment-status">

                  <Badge>

                    <FaCheckCircle />

                    Paid Online

                  </Badge>

                </div>


                {/* ACTION */}

                <div className="donation-action">

                  <Button
                    onClick={() =>
                      setSelectedDonation(donation)
                    }
                  >

                    <FaEye />

                    View

                    <FaArrowRight />

                  </Button>

                </div>


              </div>

            ))

          ) : (


            <div className="no-donations">

              <div className="no-donation-icon">
                <FaDonate />
              </div>

              <h4>No Donations Found</h4>

              <p>
                Try searching with a different name,
                email or transaction ID.
              </p>

            </div>


          )}


        </div>


      </Card>


      {/* =========================================
          VIEW DONATION MODAL
      ========================================= */}

      <Modal
        show={!!selectedDonation}
        onHide={() =>
          setSelectedDonation(null)
        }
        centered
        size="lg"
      >


        {selectedDonation && (

          <>


            <Modal.Header closeButton>

              <div>

                <span className="modal-label">
                  DONATION DETAILS
                </span>

                <Modal.Title>
                  Donation Information
                </Modal.Title>

              </div>

            </Modal.Header>


            <Modal.Body>


              {/* DONOR */}

              <div className="modal-donor">

                <div className="modal-donor-avatar">

                  {getInitials(
                    selectedDonation.name
                  )}

                </div>

                <div>

                  <h4>
                    {selectedDonation.name}
                  </h4>

                  <span>
                    {selectedDonation.email}
                  </span>

                </div>

              </div>


              {/* DETAILS */}

              <div className="donation-details-grid">


                <div className="detail-box">

                  <span>DONATION AMOUNT</span>

                  <strong>
                    {selectedDonation.amount}
                  </strong>

                </div>


                <div className="detail-box">

                  <span>TRANSACTION ID</span>

                  <strong>
                    {selectedDonation.transactionId}
                  </strong>

                </div>


                <div className="detail-box">

                  <span>PHONE NUMBER</span>

                  <strong>
                    {selectedDonation.phone}
                  </strong>

                </div>


                <div className="detail-box">

                  <span>DONATION DATE</span>

                  <strong>
                    {selectedDonation.date}
                  </strong>

                </div>


              </div>


              {/* PAYMENT */}

              <div className="modal-payment">

                <div>

                  <FaCheckCircle />

                  <div>

                    <strong>
                      Payment Completed
                    </strong>

                    <span>
                      Successfully received through online payment
                    </span>

                  </div>

                </div>

                <Badge>
                  PAID
                </Badge>

              </div>


              {/* MESSAGE */}

              <div className="donor-message">

                <label>
                  DONOR MESSAGE
                </label>

                <p>
                  {selectedDonation.message}
                </p>

              </div>


            </Modal.Body>


            <Modal.Footer>

              <Button
                className="close-donation-modal"
                onClick={() =>
                  setSelectedDonation(null)
                }
              >
                Close
              </Button>

            </Modal.Footer>


          </>

        )}

      </Modal>


    </div>

  );

}


export default Donations;