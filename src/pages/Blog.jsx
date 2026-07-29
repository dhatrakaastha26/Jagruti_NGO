// import AdminLayout from "../layouts/AdminLayout";
import React, { useMemo, useState } from "react";
import {
  Container, Row, Col, Card, Button, Modal, Form,
  InputGroup, Badge
} from "react-bootstrap";
import {
  FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash,
  FaBlog, FaCheckCircle, FaFileAlt, FaLayerGroup,
  FaCalendarAlt, FaUser, FaArrowLeft, FaGlobe
} from "react-icons/fa";

const categories = [
  "Education",
  "Women Empowerment",
  "Healthcare",
  "Environment",
  "Community Development"
];

const initialBlogs = [
  {
    id: 1,
    title: "Empowering Children Through Education",
    category: "Education",
    description:
      "Discover how our education initiatives are helping children build a brighter and more confident future.",
    content:
      "Education is one of the most powerful tools for creating positive change in society. Through our initiatives, we aim to provide children with the resources and opportunities they need to succeed.",
    author: "Admin",
    date: "15 July 2026",
    status: "Published",
    published: true,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900"
  },
  {
    id: 2,
    title: "Building Stronger Women Leaders",
    category: "Women Empowerment",
    description:
      "Our women empowerment programs focus on skills, confidence and financial independence.",
    content:
      "Empowering women creates stronger families and communities. Our skill development initiatives help women discover new opportunities.",
    author: "Admin",
    date: "10 July 2026",
    status: "Published",
    published: true,
    image:
      "https://images.unsplash.com/photo-1573496799515-eebbb63814f2?w=900"
  },
  {
    id: 3,
    title: "Community Health Awareness Camp",
    category: "Healthcare",
    description:
      "A look at our recent health awareness campaign and its impact on the local community.",
    content:
      "Healthcare awareness plays an important role in building healthier communities. Our health camps provide valuable information and support.",
    author: "Admin",
    date: "05 July 2026",
    status: "Published",
    published: true,
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900"
  },
  {
    id: 4,
    title: "Together for a Greener Tomorrow",
    category: "Environment",
    description:
      "Learn how our environmental initiatives encourage communities to protect nature.",
    content:
      "Environmental conservation is everyone's responsibility. Our plantation and awareness drives encourage people to take meaningful action.",
    author: "Admin",
    date: "28 June 2026",
    status: "Draft",
    published: false,
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=900"
  },
  {
    id: 5,
    title: "Creating Stronger Communities Together",
    category: "Community Development",
    description:
      "How community participation and collaboration can create lasting positive change.",
    content:
      "Strong communities are built when people come together and support one another. Our initiatives focus on creating sustainable community development.",
    author: "Admin",
    date: "20 June 2026",
    status: "Published",
    published: true,
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900"
  }
];

const emptyBlog = {
  title: "",
  category: "Education",
  description: "",
  content: "",
  author: "Admin",
  date: "",
  status: "Draft",
  published: false,
  image: ""
};

const Blog = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [modal, setModal] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const stats = [
    [FaBlog, blogs.length, "Total Blogs", "navy"],
    [FaCheckCircle, blogs.filter(b => b.status === "Published").length, "Published", "red"],
    [FaFileAlt, blogs.filter(b => b.status === "Draft").length, "Drafts", "navy"],
    [FaLayerGroup, new Set(blogs.map(b => b.category)).size, "Categories", "red"]
  ];

  const filteredBlogs = useMemo(
    () =>
      blogs.filter(
        b =>
          b.title.toLowerCase().includes(search.toLowerCase()) &&
          (category === "All" || b.category === category) &&
          (status === "All" || b.status === status)
      ),
    [blogs, search, category, status]
  );

  const updateForm = e => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const openAdd = () => {
    setForm(emptyBlog);
    setModal("add");
  };

  const openEdit = blog => {
    setSelected(blog);
    setForm({ ...blog });
    setModal("edit");
  };

  const saveBlog = e => {
    e.preventDefault();

    const blogData = {
      ...form,
      status: form.published ? "Published" : "Draft"
    };

    if (modal === "add") {
      setBlogs([
        ...blogs,
        {
          ...blogData,
          id: Date.now(),
          image:
            form.image ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900"
        }
      ]);
    } else {
      setBlogs(
        blogs.map(b =>
          b.id === selected.id ? { ...b, ...blogData } : b
        )
      );
    }

    setModal("");
    setForm(emptyBlog);
  };

  const deleteBlog = () => {
    setBlogs(blogs.filter(b => b.id !== selected.id));
    setSelected(null);
    setModal("");
  };

  return (
    <>
      <style>{`
        :root{
          --navy:#0B2C6B;
          --dark:#031436;
          --red:#E53935;
          --light-red:#FFF1F0;
          --light-navy:#EEF3FA;
          --bg:#F7F8FC;
          --text:#172033;
          --muted:#64748B;
          --border:#E5EAF1;
        }

        .blog-page{
          min-height:100vh;
          background:var(--bg);
          padding:30px;
        }

        .blog-hero{
          background:linear-gradient(135deg,var(--dark),var(--navy));
          color:white;
          border-radius:20px;
          padding:32px;
          margin-bottom:25px;
        }

        .hero-label{
          color:#FCA5A5;
          font-size:10px;
          font-weight:800;
          letter-spacing:2px;
        }

        .blog-hero h1{
          font-size:30px;
          font-weight:800;
          margin:6px 0;
        }

        .blog-hero p{
          color:#D7E0EF;
          font-size:13px;
          margin:0;
        }

        .primary-btn,
        .primary-btn:hover{
          background:var(--red);
          border-color:var(--red);
          font-size:11px;
          font-weight:700;
        }

        .primary-btn:hover{
          background:var(--dark);
          border-color:var(--dark);
        }

        .stat-card{
          border:1px solid var(--border);
          border-radius:16px;
          transition:.3s;
        }

        .stat-card:hover,
        .blog-card:hover{
          transform:translateY(-5px);
          box-shadow:0 15px 30px #03143612;
        }

        .stat-icon{
          width:44px;
          height:44px;
          display:grid;
          place-items:center;
          border-radius:12px;
        }

        .navy-icon{
          background:var(--light-navy);
          color:var(--navy);
        }

        .red-icon{
          background:var(--light-red);
          color:var(--red);
        }

        .stat-number{
          color:var(--dark);
          font-size:21px;
          font-weight:800;
        }

        .stat-label,
        .blog-meta{
          color:var(--muted);
          font-size:11px;
        }

        .section-title{
          color:var(--dark);
          font-size:22px;
          font-weight:800;
          margin:35px 0 5px;
        }

        .filter-box{
          background:white;
          border:1px solid var(--border);
          border-radius:16px;
          padding:15px;
          margin:22px 0;
        }

        .filter-control{
          font-size:12px;
          box-shadow:none!important;
        }

        .blog-card{
          height:100%;
          overflow:hidden;
          border:1px solid var(--border);
          border-radius:16px;
          transition:.3s;
        }

        .blog-image{
          height:200px;
          position:relative;
          overflow:hidden;
        }

        .blog-image img{
          width:100%;
          height:100%;
          object-fit:cover;
          transition:.5s;
        }

        .blog-card:hover .blog-image img{
          transform:scale(1.07);
        }

        .category-badge{
          position:absolute;
          left:14px;
          top:14px;
          background:var(--red);
          color:white;
          padding:6px 11px;
          border-radius:20px;
          font-size:9px;
          font-weight:700;
        }

        .status-badge{
          position:absolute;
          right:14px;
          top:14px;
          padding:6px 11px;
          border-radius:20px;
          font-size:9px;
          font-weight:700;
        }

        .published{
          background:#EAF4FF;
          color:var(--navy);
        }

        .draft{
          background:var(--light-red);
          color:var(--red);
        }

        .blog-title{
          color:var(--dark);
          font-size:17px;
          font-weight:800;
          line-height:1.4;
        }

        .blog-description{
          color:var(--muted);
          font-size:11px;
          line-height:1.7;
          min-height:58px;
        }

        .blog-info{
          display:flex;
          gap:15px;
          flex-wrap:wrap;
          padding:12px 0;
          margin:10px 0;
          border-block:1px solid #F0F2F5;
        }

        .blog-info span{
          color:var(--muted);
          font-size:9px;
        }

        .blog-info svg{
          color:var(--red);
          margin-right:4px;
        }

        .action-btn{
          font-size:10px;
          font-weight:700;
          border-radius:7px;
          padding:7px 10px;
        }

        .view-btn{
          background:var(--light-navy);
          color:var(--navy);
          border:0;
        }

        .edit-btn{
          flex:1;
          background:white;
          color:var(--navy);
          border:1px solid #CBD5E1;
        }

        .delete-btn{
          background:var(--light-red);
          color:var(--red);
          border:0;
        }

        .modal-label{
          color:var(--dark);
          font-size:11px;
          font-weight:700;
        }

        .modal-control{
          font-size:12px;
          box-shadow:none!important;
        }

        @media(max-width:768px){
          .blog-page{
            padding:15px;
          }

          .blog-hero{
            padding:24px;
          }

          .blog-hero h1{
            font-size:25px;
          }

          .blog-hero button{
            width:100%;
            margin-top:18px;
          }
        }
      `}</style>

      <div className="blog-page">
        <Container fluid>

          {/* HEADER */}

          <div className="blog-hero">
            <Row className="align-items-center">
              <Col lg={8}>
                <div className="hero-label">
                  ADMINISTRATION / BLOG MANAGEMENT
                </div>

                <h1>Manage Your Stories</h1>

                <p>
                  Create, publish and manage foundation stories,
                  news and community updates.
                </p>
              </Col>

              <Col lg={4} className="text-lg-end">
                <Button className="primary-btn" onClick={openAdd}>
                  <FaPlus className="me-2" />
                  Add New Blog
                </Button>
              </Col>
            </Row>
          </div>

          {/* STATS */}

          <Row className="g-3">
            {stats.map(([Icon, number, label, color]) => (
              <Col xs={6} lg={3} key={label}>
                <Card className="stat-card">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className={`stat-icon ${color}-icon`}>
                      <Icon />
                    </div>

                    <div>
                      <div className="stat-number">{number}</div>
                      <div className="stat-label">{label}</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h2 className="section-title">All Blog Posts</h2>

          <p className="stat-label">
            Manage your foundation's stories and updates.
          </p>

          {/* FILTERS */}

          <div className="filter-box">
            <Row className="g-2">
              <Col lg={5}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>

                  <Form.Control
                    className="filter-control"
                    placeholder="Search blogs..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <Col sm={6} lg={3}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaFilter />
                  </InputGroup.Text>

                  <Form.Select
                    className="filter-control"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {categories.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Col>

              <Col sm={6} lg={3}>
                <Form.Select
                  className="filter-control"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </Form.Select>
              </Col>
            </Row>
          </div>

          {/* BLOG CARDS */}

          <Row className="g-4">
            {filteredBlogs.length ? (
              filteredBlogs.map(blog => (
                <Col xs={12} sm={6} xl={4} key={blog.id}>
                  <Card className="blog-card">

                    <div className="blog-image">
                      <img src={blog.image} alt={blog.title} />

                      <span className="category-badge">
                        {blog.category}
                      </span>

                      <span
                        className={`status-badge ${
                          blog.status === "Published"
                            ? "published"
                            : "draft"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </div>

                    <Card.Body>
                      <h3 className="blog-title">
                        {blog.title}
                      </h3>

                      <p className="blog-description">
                        {blog.description}
                      </p>

                      <div className="blog-info">
                        <span>
                          <FaUser />
                          {blog.author}
                        </span>

                        <span>
                          <FaCalendarAlt />
                          {blog.date}
                        </span>
                      </div>

                      <div className="d-flex gap-2">
                        <Button
                          className="action-btn view-btn"
                          onClick={() => {
                            setSelected(blog);
                            setModal("view");
                          }}
                        >
                          <FaEye />
                        </Button>

                        <Button
                          className="action-btn edit-btn"
                          onClick={() => openEdit(blog)}
                        >
                          <FaEdit /> Update
                        </Button>

                        <Button
                          className="action-btn delete-btn"
                          onClick={() => {
                            setSelected(blog);
                            setModal("delete");
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </Card.Body>

                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <div className="text-center p-5">
                  <FaBlog
                    style={{
                      fontSize: 40,
                      color: "var(--muted)"
                    }}
                  />

                  <h5 className="mt-3">
                    No blogs found
                  </h5>

                  <p className="stat-label">
                    Try changing your search or filters.
                  </p>
                </div>
              </Col>
            )}
          </Row>

        </Container>
      </div>

      {/* ADD / UPDATE MODAL */}

      <Modal
        show={modal === "add" || modal === "edit"}
        onHide={() => setModal("")}
        centered
        size="lg"
      >
        <Form onSubmit={saveBlog}>

          <Modal.Header closeButton>
            <Modal.Title className="modal-title">
              {modal === "add"
                ? "Create New Blog"
                : "Update Blog"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="g-3">

              <Col md={8}>
                <Form.Label className="modal-label">
                  Blog Title
                </Form.Label>

                <Form.Control
                  className="modal-control"
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  placeholder="Enter blog title"
                  required
                />
              </Col>

              <Col md={4}>
                <Form.Label className="modal-label">
                  Category
                </Form.Label>

                <Form.Select
                  className="modal-control"
                  name="category"
                  value={form.category}
                  onChange={updateForm}
                >
                  {categories.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label className="modal-label">
                  Author
                </Form.Label>

                <Form.Control
                  className="modal-control"
                  name="author"
                  value={form.author}
                  onChange={updateForm}
                />
              </Col>

              <Col md={6}>
                <Form.Label className="modal-label">
                  Publish Date
                </Form.Label>

                <Form.Control
                  className="modal-control"
                  name="date"
                  value={form.date}
                  onChange={updateForm}
                  placeholder="15 July 2026"
                />
              </Col>

              <Col xs={12}>
                <Form.Label className="modal-label">
                  Featured Image URL
                </Form.Label>

                <Form.Control
                  className="modal-control"
                  name="image"
                  value={form.image}
                  onChange={updateForm}
                  placeholder="Paste image URL"
                />
              </Col>

              <Col xs={12}>
                <Form.Label className="modal-label">
                  Short Description
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={2}
                  className="modal-control"
                  name="description"
                  value={form.description}
                  onChange={updateForm}
                  placeholder="Write a short description..."
                  required
                />
              </Col>

              <Col xs={12}>
                <Form.Label className="modal-label">
                  Blog Content
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={6}
                  className="modal-control"
                  name="content"
                  value={form.content}
                  onChange={updateForm}
                  placeholder="Write your complete blog content..."
                  required
                />
              </Col>

              <Col xs={12}>
                <Form.Check
                  type="switch"
                  name="published"
                  checked={form.published}
                  onChange={updateForm}
                  label="Publish this blog on the website"
                />
              </Col>

            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="light"
              onClick={() => setModal("")}
            >
              Cancel
            </Button>

            <Button
              className="primary-btn"
              type="submit"
            >
              {modal === "add"
                ? <><FaPlus /> Add Blog</>
                : <><FaEdit /> Save Changes</>}
            </Button>
          </Modal.Footer>

        </Form>
      </Modal>

      {/* VIEW MODAL */}

      <Modal
        show={modal === "view"}
        onHide={() => setModal("")}
        centered
        size="lg"
      >
        {selected && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                Blog Preview
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <img
                src={selected.image}
                alt={selected.title}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "14px"
                }}
              />

              <Badge
                className="mt-3"
                style={{
                  background: "var(--light-red)",
                  color: "var(--red)"
                }}
              >
                {selected.category}
              </Badge>

              <h2
                className="mt-3"
                style={{
                  color: "var(--dark)",
                  fontWeight: 800
                }}
              >
                {selected.title}
              </h2>

              <div className="blog-info">
                <span>
                  <FaUser /> {selected.author}
                </span>

                <span>
                  <FaCalendarAlt /> {selected.date}
                </span>

                <span>
                  <FaGlobe /> {selected.status}
                </span>
              </div>

              <p className="blog-description">
                {selected.description}
              </p>

              <p
                style={{
                  color: "var(--text)",
                  fontSize: 13,
                  lineHeight: 1.8
                }}
              >
                {selected.content}
              </p>

            </Modal.Body>

            <Modal.Footer>

              <Button
                variant="light"
                onClick={() => setModal("")}
              >
                Close
              </Button>

              <Button
                className="primary-btn"
                onClick={() => openEdit(selected)}
              >
                <FaEdit /> Update
              </Button>

            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* DELETE MODAL */}

      <Modal
        show={modal === "delete"}
        onHide={() => setModal("")}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Delete Blog
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center p-4">

          <FaTrash
            style={{
              fontSize: 35,
              color: "var(--red)"
            }}
          />

          <h5 className="mt-3">
            Delete this blog?
          </h5>

          <p className="stat-label">
            Are you sure you want to delete{" "}
            <b>{selected?.title}</b>?
            This action cannot be undone.
          </p>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="light"
            onClick={() => setModal("")}
          >
            Cancel
          </Button>

          <Button
            style={{
              background: "var(--red)",
              border: 0
            }}
            onClick={deleteBlog}
          >
            <FaTrash /> Delete
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Blog;
