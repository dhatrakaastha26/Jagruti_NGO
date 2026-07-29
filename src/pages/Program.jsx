import React, { useMemo, useState } from "react";
import {
  Container, Row, Col, Card, Button, Modal, Form,
  InputGroup, Badge
} from "react-bootstrap";
import {
  FaGraduationCap, FaFemale, FaHeartbeat, FaLeaf,
  FaHandsHelping, FaBriefcase, FaArrowRight, FaArrowLeft,
  FaPlus, FaEye, FaEdit, FaTrash, FaUsers, FaMapMarkerAlt,
  FaCalendarAlt, FaCheckCircle, FaClock, FaLayerGroup,
  FaSearch, FaFilter, FaGlobe
} from "react-icons/fa";

const categories = [
  ["Education", FaGraduationCap, "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900", "Creating brighter futures through accessible education."],
  ["Women Empowerment", FaFemale, "https://images.unsplash.com/photo-1573496799515-eebbb63814f2?w=900", "Empowering women through skills and opportunities."],
  ["Healthcare", FaHeartbeat, "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900", "Building healthier communities through care and awareness."],
  ["Environment", FaLeaf, "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=900", "Protecting nature through sustainable initiatives."],
  ["Community Development", FaHandsHelping, "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900", "Strengthening communities through collective action."],
  ["Skill Development", FaBriefcase, "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900", "Building skills for sustainable livelihoods."]
].map(([name, icon, image, description], i) => ({
  id: i + 1, name, icon, image, description
}));

const initialPrograms = [
  ["Education", "Education Support Program", "Providing educational resources and academic support to underprivileged children.", "Satpur, Nashik", "15 July 2026", "120+", "Active"],
  ["Education", "Digital Learning Initiative", "Helping students access digital resources and technology-enabled education.", "Nashik", "20 August 2026", "85+", "Upcoming"],
  ["Education", "Scholarship Support", "Supporting deserving students with financial assistance for education.", "Nashik", "10 June 2026", "65+", "Completed"],
  ["Women Empowerment", "Women Skill Development", "Providing women with skills and opportunities for financial independence.", "Nashik", "25 July 2026", "100+", "Active"],
  ["Healthcare", "Community Health Camp", "Organizing health awareness and medical support camps.", "Satpur, Nashik", "05 August 2026", "200+", "Upcoming"],
  ["Environment", "Tree Plantation Drive", "Encouraging communities to participate in environmental conservation.", "Nashik", "12 June 2026", "150+", "Completed"]
].map(([category, title, description, location, date, beneficiaries, status], i) => ({
  id: i + 1,
  category,
  title,
  description,
  location,
  date,
  beneficiaries,
  status,
  published: true,
  image: categories.find(c => c.name === category)?.image
}));

const emptyForm = {
  title: "", description: "", location: "", date: "",
  beneficiaries: "", status: "Active", image: "", published: true
};

const Programs = () => {
  const [programs, setPrograms] = useState(initialPrograms);
  const [category, setCategory] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [modal, setModal] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const stats = [
    [FaLayerGroup, programs.length, "Total Programs", "navy"],
    [FaCheckCircle, programs.filter(p => p.status === "Active").length, "Active Programs", "navy"],
    [FaClock, programs.filter(p => p.status === "Upcoming").length, "Upcoming", "red"],
    [FaGlobe, programs.filter(p => p.published).length, "Published", "red"]
  ];

  const filtered = useMemo(() =>
    programs.filter(p =>
      p.category === category?.name &&
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || p.status === filter)
    ), [programs, category, search, filter]
  );

  const updateForm = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const openAdd = () => {
    setForm(emptyForm);
    setModal("add");
  };

  const openEdit = p => {
    setSelected(p);
    setForm({ ...p });
    setModal("edit");
  };

  const saveProgram = e => {
    e.preventDefault();

    if (modal === "add") {
      setPrograms([
        ...programs,
        {
          ...form,
          id: Date.now(),
          category: category.name,
          image: form.image || category.image
        }
      ]);
    } else {
      setPrograms(programs.map(p =>
        p.id === selected.id ? { ...p, ...form } : p
      ));
    }

    setModal("");
    setForm(emptyForm);
  };

  const deleteProgram = () => {
    setPrograms(programs.filter(p => p.id !== selected.id));
    setModal("");
    setSelected(null);
  };

  const statusClass = status =>
    status === "Active"
      ? "active"
      : status === "Upcoming"
      ? "upcoming"
      : "completed";

  return (
    <>
      <style>{`
        :root {
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

        .page{background:var(--bg);min-height:100vh;padding:30px}
        .hero{background:linear-gradient(135deg,var(--dark),var(--navy));color:white;padding:32px;border-radius:20px;margin-bottom:24px}
        .hero h1{font-size:30px;font-weight:800;margin:5px 0}
        .hero p{color:#D7E0EF;font-size:13px;margin:0}
        .label{font-size:10px;color:#FCA5A5;font-weight:800;letter-spacing:2px}
        .primary,.primary:hover{background:var(--red);border-color:var(--red);font-size:11px;font-weight:700}
        .primary:hover{background:var(--dark);border-color:var(--dark)}

        .stat,.category,.program,.detail,.filter{border:1px solid var(--border);border-radius:16px;background:white}
        .stat{transition:.3s}
        .stat:hover,.category:hover,.program:hover{transform:translateY(-5px);box-shadow:0 15px 30px #03143612}
        .stat-icon{width:42px;height:42px;border-radius:11px;display:grid;place-items:center}
        .navy-bg{background:var(--light-navy);color:var(--navy)}
        .red-bg{background:var(--light-red);color:var(--red)}
        .stat-number{font-size:21px;font-weight:800;color:var(--dark)}
        .stat-label,.muted{font-size:11px;color:var(--muted)}

        .section-title{color:var(--dark);font-size:22px;font-weight:800;margin:35px 0 5px}
        .category,.program{overflow:hidden;height:100%;transition:.3s}
        .category-img,.program-img{height:190px;position:relative;overflow:hidden}
        .category-img img,.program-img img{width:100%;height:100%;object-fit:cover;transition:.5s}
        .category:hover img,.program:hover img{transform:scale(1.07)}
        .overlay{position:absolute;inset:0;background:linear-gradient(transparent,#031436dd)}
        .cat-icon{position:absolute;top:15px;left:15px;background:var(--red);color:white;padding:13px;border-radius:11px}
        .cat-name{position:absolute;bottom:15px;left:18px;color:white;font-size:18px;font-weight:800}
        .card-body{padding:18px}
        .manage{background:var(--red);border:0;font-size:10px;font-weight:700}
        .manage:hover{background:var(--dark)}

        .detail{padding:22px;margin-bottom:20px}
        .detail-icon{width:52px;height:52px;border-radius:13px;background:var(--light-red);color:var(--red);display:grid;place-items:center;font-size:22px}
        .detail h2{font-size:22px;font-weight:800;color:var(--dark)}
        .back{border:0;background:none;color:var(--navy);font-size:12px;font-weight:700;padding:0;margin-bottom:18px}

        .filter{padding:14px;margin-bottom:22px}
        .search{font-size:12px;box-shadow:none!important}
        .program-img{height:175px}
        .status{position:absolute;top:12px;right:12px;border-radius:20px;padding:5px 10px;font-size:9px;font-weight:700}
        .active{background:var(--light-navy);color:var(--navy)}
        .upcoming{background:var(--light-red);color:var(--red)}
        .completed{background:#F1F5F9;color:#64748B}
        .program-title{font-size:16px;font-weight:800;color:var(--dark)}
        .program-desc{font-size:11px;color:var(--muted);line-height:1.7;min-height:55px}
        .meta{display:flex;gap:10px;flex-wrap:wrap;border-block:1px solid #F0F2F5;padding:12px 0;margin:10px 0;font-size:9px;color:var(--muted)}
        .meta svg{color:var(--red)}
        .actions{display:flex;gap:6px}
        .action{border-radius:7px;font-size:10px;font-weight:700;padding:7px}
        .view{background:var(--light-navy);color:var(--navy);border:0}
        .edit{background:white;color:var(--navy);border:1px solid #CBD5E1;flex:1}
        .delete{background:var(--light-red);color:var(--red);border:0}

        .modal-control{font-size:12px;box-shadow:none!important}
        .modal-label{font-size:11px;font-weight:700;color:var(--dark)}
        .modal-title{font-weight:800;color:var(--dark)}

        @media(max-width:768px){
          .page{padding:15px}
          .hero{padding:24px}
          .hero h1{font-size:25px}
          .hero button{width:100%;margin-top:15px}
          .detail-content{align-items:flex-start!important;flex-direction:column}
          .detail-content button{width:100%}
        }
      `}</style>

      <div className="page">
        <Container fluid>

          {!category ? (
            <>
              <div className="hero">
                <Row className="align-items-center">
                  <Col lg={8}>
                    <div className="label">ADMINISTRATION / PROGRAMS</div>
                    <h1>Manage Your Impact</h1>
                    <p>Organize, manage and monitor all foundation programs from one central place.</p>
                  </Col>
                  <Col lg={4} className="text-lg-end">
                    <Button className="primary" onClick={openAdd}>
                      <FaPlus className="me-2" /> Add New Program
                    </Button>
                  </Col>
                </Row>
              </div>

              <Row className="g-3">
                {stats.map(([Icon, number, label, color]) => (
                  <Col xs={6} lg={3} key={label}>
                    <Card className="stat">
                      <Card.Body className="d-flex align-items-center gap-3">
                        <div className={`stat-icon ${color}-bg`}><Icon /></div>
                        <div>
                          <div className="stat-number">{number}</div>
                          <div className="stat-label">{label}</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <h2 className="section-title">Explore Program Categories</h2>
              <p className="muted mb-4">Select a category to view and manage its programs.</p>

              <Row className="g-4">
                {categories.map(c => {
                  const Icon = c.icon;
                  const list = programs.filter(p => p.category === c.name);

                  return (
                    <Col xs={12} sm={6} xl={4} key={c.id}>
                      <Card className="category">
                        <div className="category-img">
                          <img src={c.image} alt={c.name} />
                          <div className="overlay" />
                          <div className="cat-icon"><Icon /></div>
                          <div className="cat-name">{c.name}</div>
                        </div>

                        <Card.Body>
                          <p className="muted">{c.description}</p>
                          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                            <span className="muted">
                              <b>{list.length}</b> Programs
                            </span>
                            <Button className="manage" onClick={() => setCategory(c)}>
                              Manage <FaArrowRight className="ms-1" />
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : (
            <>
              <Button className="back" onClick={() => setCategory(null)}>
                <FaArrowLeft className="me-2" /> Back to Categories
              </Button>

              <div className="detail">
                <div className="detail-content d-flex justify-content-between align-items-center gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="detail-icon">
                      {React.createElement(category.icon)}
                    </div>
                    <div>
                      <h2 className="mb-1">{category.name}</h2>
                      <p className="muted mb-0">{category.description}</p>
                    </div>
                  </div>

                  <Button className="primary" onClick={openAdd}>
                    <FaPlus className="me-2" /> Add Program
                  </Button>
                </div>
              </div>

              <div className="filter">
                <Row className="g-2">
                  <Col md={8}>
                    <InputGroup>
                      <InputGroup.Text><FaSearch /></InputGroup.Text>
                      <Form.Control
                        className="search"
                        placeholder="Search programs..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text><FaFilter /></InputGroup.Text>
                      <Form.Select value={filter} onChange={e => setFilter(e.target.value)}>
                        <option>All</option>
                        <option>Active</option>
                        <option>Upcoming</option>
                        <option>Completed</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>
                </Row>
              </div>

              <Row className="g-4">
                {filtered.map(p => (
                  <Col xs={12} sm={6} xl={4} key={p.id}>
                    <Card className="program">
                      <div className="program-img">
                        <img src={p.image} alt={p.title} />
                        <span className={`status ${statusClass(p.status)}`}>
                          {p.status}
                        </span>
                      </div>

                      <Card.Body>
                        <h3 className="program-title">{p.title}</h3>
                        <p className="program-desc">{p.description}</p>

                        <div className="meta">
                          <span><FaMapMarkerAlt /> {p.location}</span>
                          <span><FaCalendarAlt /> {p.date}</span>
                          <span><FaUsers /> {p.beneficiaries}</span>
                        </div>

                        <div className="actions">
                          <Button className="action view" onClick={() => {
                            setSelected(p);
                            setModal("view");
                          }}>
                            <FaEye /> View
                          </Button>

                          <Button className="action edit" onClick={() => openEdit(p)}>
                            <FaEdit /> Update
                          </Button>

                          <Button className="action delete" onClick={() => {
                            setSelected(p);
                            setModal("delete");
                          }}>
                            <FaTrash />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </div>

      {/* ADD / UPDATE MODAL */}

      <Modal show={modal === "add" || modal === "edit"} onHide={() => setModal("")} centered size="lg">
        <Form onSubmit={saveProgram}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modal === "add" ? "Add New Program" : "Update Program"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="g-3">
              {[
                ["title", "Program Name", "Enter program name", 8],
                ["location", "Location", "Enter location", 4],
                ["date", "Program Date", "15 July 2026", 6],
                ["beneficiaries", "Beneficiaries", "120+", 6],
                ["image", "Image URL", "Paste image URL", 12]
              ].map(([name, label, placeholder, size]) => (
                <Col md={size} key={name}>
                  <Form.Group>
                    <Form.Label className="modal-label">{label}</Form.Label>
                    <Form.Control
                      className="modal-control"
                      name={name}
                      value={form[name]}
                      onChange={updateForm}
                      placeholder={placeholder}
                      required={name === "title"}
                    />
                  </Form.Group>
                </Col>
              ))}

              <Col md={6}>
                <Form.Label className="modal-label">Status</Form.Label>
                <Form.Select
                  className="modal-control"
                  name="status"
                  value={form.status}
                  onChange={updateForm}
                >
                  <option>Active</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                </Form.Select>
              </Col>

              <Col xs={12}>
                <Form.Label className="modal-label">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="modal-control"
                  name="description"
                  value={form.description}
                  onChange={updateForm}
                  required
                />
              </Col>

              <Col xs={12}>
                <Form.Check
                  type="switch"
                  name="published"
                  checked={form.published}
                  onChange={updateForm}
                  label="Publish this program on the website"
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={() => setModal("")}>Cancel</Button>
            <Button className="primary" type="submit">
              {modal === "add" ? <FaPlus /> : <FaEdit />}
              {" "}{modal === "add" ? "Add Program" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* VIEW MODAL */}

      <Modal show={modal === "view"} onHide={() => setModal("")} centered size="lg">
        {selected && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Program Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row className="g-4">
                <Col md={5}>
                  <img
                    src={selected.image}
                    alt={selected.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "12px"
                    }}
                  />
                </Col>

                <Col md={7}>
                  <Badge className={statusClass(selected.status)}>
                    {selected.status}
                  </Badge>

                  <h3 className="program-title mt-3">{selected.title}</h3>
                  <p className="program-desc">{selected.description}</p>

                  <div className="meta">
                    <span><FaMapMarkerAlt /> {selected.location}</span>
                    <span><FaCalendarAlt /> {selected.date}</span>
                    <span><FaUsers /> {selected.beneficiaries}</span>
                  </div>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="light" onClick={() => setModal("")}>Close</Button>
              <Button className="primary" onClick={() => openEdit(selected)}>
                <FaEdit /> Update
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* DELETE MODAL */}

      <Modal show={modal === "delete"} onHide={() => setModal("")} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Program</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center p-4">
          <FaTrash style={{ fontSize: 35, color: "var(--red)" }} />
          <h5 className="mt-3">Delete this program?</h5>
          <p className="muted">
            Are you sure you want to delete <b>{selected?.title}</b>?
            This action cannot be undone.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={() => setModal("")}>Cancel</Button>
          <Button
            style={{ background: "var(--red)", border: 0 }}
            onClick={deleteProgram}
          >
            <FaTrash /> Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Programs;