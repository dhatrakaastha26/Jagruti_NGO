import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Badge,
} from "react-bootstrap";
import {
  FaImages,
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaHeart,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import "../assets/css/Gallery.css";

const galleryData = [
  {
    id: 1,
    title: "Education Drive",
    category: "Education",
    date: "12 June 2026",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Women Empowerment",
    category: "Women",
    date: "05 June 2026",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Community Support",
    category: "Community",
    date: "28 May 2026",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Health Awareness Camp",
    category: "Healthcare",
    date: "18 May 2026",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Tree Plantation",
    category: "Environment",
    date: "10 May 2026",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Children Activity",
    category: "Education",
    date: "02 May 2026",
    image:
      "https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=800&q=80",
  },
];

const stats = [
  {
    title: "Total Photos",
    value: "248",
    icon: FaImages,
    type: "navy",
  },
  {
    title: "This Month",
    value: "32",
    icon: FaCalendarAlt,
    type: "coral",
  },
  {
    title: "Categories",
    value: "08",
    icon: FaFilter,
    type: "purple",
  },
  {
    title: "Total Views",
    value: "12.5K",
    icon: FaEye,
    type: "green",
  },
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    "All",
    "Education",
    "Women",
    "Community",
    "Healthcare",
    "Environment",
  ];

  const filteredGallery = galleryData.filter((item) => {
    const categoryMatch =
      activeCategory === "All" || item.category === activeCategory;

    const searchMatch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="gallery-page">
      <Container fluid className="gallery-container">

        {/* Header */}
        <div className="gallery-header">
          <div>
            <div className="page-breadcrumb">
              Dashboard <span>/</span> Gallery
            </div>

            <h2 className="gallery-title">
              Gallery Management
            </h2>

            <p className="gallery-subtitle">
              Manage and showcase your NGO's memorable moments and activities.
            </p>
          </div>

          <Button className="upload-btn">
            <FaPlus /> Upload New Image
          </Button>
        </div>

        {/* Stats */}
        <Row className="g-4 mb-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Col key={index} xs={12} sm={6} xl={3}>
                <Card className="stat-card">
                  <Card.Body>
                    <div className={`stat-icon ${stat.type}`}>
                      <Icon />
                    </div>

                    <div className="stat-info">
                      <p>{stat.title}</p>
                      <h3>{stat.value}</h3>
                    </div>

                    <div className="stat-decoration"></div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Gallery Toolbar */}
        <Card className="gallery-toolbar">
          <div className="toolbar-left">
            <h5>
              <FaImages /> All Gallery Photos
            </h5>

            <Badge className="photo-count">
              {filteredGallery.length} Photos
            </Badge>
          </div>

          <div className="toolbar-right">
            <div className="search-box">
              <FaSearch />
              <Form.Control
                type="text"
                placeholder="Search photos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Categories */}
        <div className="category-wrapper">
          {categories.map((category) => (
            <Button
              key={category}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <Row className="g-4">
          {filteredGallery.map((item) => (
            <Col key={item.id} xs={12} sm={6} lg={4} xl={3}>
              <Card className="gallery-card">

                <div className="gallery-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-image"
                  />

                  <div className="image-overlay">
                    <Button
                      className="view-btn"
                      onClick={() => setSelectedImage(item)}
                    >
                      <FaEye /> View
                    </Button>

                    <div className="overlay-actions">
                      <Button className="icon-btn edit">
                        <FaEdit />
                      </Button>

                      <Button className="icon-btn delete">
                        <FaTrash />
                      </Button>
                    </div>
                  </div>

                  <Badge className="category-badge">
                    {item.category}
                  </Badge>
                </div>

                <Card.Body className="gallery-card-body">
                  <div>
                    <h5>{item.title}</h5>

                    <p>
                      <FaCalendarAlt /> {item.date}
                    </p>
                  </div>

                  <Button className="heart-btn">
                    <FaHeart />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="empty-gallery">
            <FaImages />
            <h4>No photos found</h4>
            <p>Try changing your search or category filter.</p>
          </div>
        )}

        {/* View Modal */}
        <Modal
          show={!!selectedImage}
          onHide={() => setSelectedImage(null)}
          centered
          size="lg"
          className="gallery-modal"
        >
          {selectedImage && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  {selectedImage.title}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="modal-gallery-image"
                />

                <div className="modal-details">
                  <Badge>{selectedImage.category}</Badge>
                  <span>
                    <FaCalendarAlt /> {selectedImage.date}
                  </span>
                </div>
              </Modal.Body>
            </>
          )}
        </Modal>

      </Container>
    </div>
  );
}

export default Gallery;