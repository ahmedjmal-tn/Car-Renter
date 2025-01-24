import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCar } from 'react-icons/fa';
import { AuthContext } from './auth/AuthContext';
import './menu.css';

function NavScrollExample() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-dark navbar-dark sticky-top shadow-sm">
        <div className="container-fluid">
          <Navbar.Brand href="#" className="fw-bold text-uppercase d-flex align-items-center">
            <img 
              src="https://res.cloudinary.com/dlzzyowik/image/upload/v1731953771/yw5fyq2rkupuoqmdbzyl.jpg" 
              alt="RentWheels Logo" 
              style={{ width: '70px', marginRight: '10px' }}
            />
            Rent Car
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="" className="nav-link text-white d-flex align-items-center">
                <FaHome className="me-2" /> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/cars" className="nav-link text-white d-flex align-items-center">
                <FaCar className="me-2" /> Cars
              </Nav.Link>
              {user && user.role === 'admin' && (
        <Nav.Link as={Link} to="/dashboard" className="nav-link text-white d-flex align-items-center">
          <FaCar className="me-2" /> Dashboard
        </Nav.Link>
      )}
            </Nav>
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search for cars..."
                className="me-2 border-0 shadow-sm"
                aria-label="Search"
                style={{ borderRadius: '20px' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="success" className="shadow-sm px-4" type="submit">
                Search
              </Button>
            </Form>
            {user ? (
              <div className="d-flex align-items-center ms-3 text-white">
                <span className="me-2">Welcome, {user.firstname || user.email}!</span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="outline-light" className="ms-3" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div className="hero-space"></div>
    </>
  );
}

export default NavScrollExample;