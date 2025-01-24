import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCar, FaPlusCircle, FaClipboardCheck, FaWrench } from 'react-icons/fa';
import { Card, Container, Row, Col, Dropdown } from 'react-bootstrap';
import Table_User from "./Table_User";
import Table_Car from "./Table_Car";
import Table_Rent from "./Table_Rent";
import Table_Maintenance from "./Table_Maintenance"; // Import the new component
import AddCar from "./AddCar";
import UpdateCar from "./UpdateCar";
import AddMaintenance from "./AddMaintenance"; // Import the AddMaintenance component
import { AuthContext } from "../auth/AuthContext";
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const renderContent = () => {
    switch (selectedPage) {
      case 'dashboard':
        return (
          <Container className="p-4" style={{ marginTop: '-50px' }}>
            <h2>Dashboard</h2>
            <p>Welcome to the {user.role === 'Admin' ? 'admin' : user.role === 'Employee' ? 'employee' : 'manager'} dashboard. Use the sidebar to navigate.</p>
            <Row>
              <Col md={4}>
                <Card className="mb-4" onClick={() => setSelectedPage('add-car')}>
                  <Card.Body className="text-center">
                    <FaPlusCircle size={50} className="mb-3" />
                    <Card.Title>Add Car</Card.Title>
                    <Card.Text>
                      Add a new car
                    </Card.Text>
                    <Link to="/dashboard/add-car" className="btn btn-primary">Go</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} onClick={() => setSelectedPage('list-cars')}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <FaCar size={50} className="mb-3" />
                    <Card.Title>Get Cars</Card.Title>
                    <Card.Text>
                      View all cars in the system
                    </Card.Text>
                    <Link to="/dashboard/list-cars" className="btn btn-primary">Go</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} onClick={() => setSelectedPage('list-users')}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <FaUser size={50} className="mb-3" />
                    <Card.Title>Get Users</Card.Title>
                    <Card.Text>
                      View all users in the system
                    </Card.Text>
                    <Link to="/dashboard/list-users" className="btn btn-primary">Go</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} onClick={() => setSelectedPage('list-rents')}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <FaClipboardCheck size={50} className="mb-3" />
                    <Card.Title>Get Rents</Card.Title>
                    <Card.Text>
                      View all rents in the system
                    </Card.Text>
                    <Link to="/dashboard/list-rents" className="btn btn-primary">Go</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} onClick={() => setSelectedPage('list-maintenance')}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <FaWrench size={50} className="mb-3" />
                    <Card.Title>Get Maintenance</Card.Title>
                    <Card.Text>
                      View all cars in maintenance
                    </Card.Text>
                    <Link to="/dashboard/list-maintenance" className="btn btn-primary">Go</Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} onClick={() => setSelectedPage('add-maintenance')}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <FaPlusCircle size={50} className="mb-3" />
                    <Card.Title>Add Maintenance</Card.Title>
                    <Card.Text>
                      Add a new maintenance record
                    </Card.Text>
                    <Link to="/dashboard/add-maintenance" className="btn btn-primary">Go</Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
      case 'add-car':
        return <AddCar />;
      case 'list-cars':
        return <Table_Car />;
      case 'list-users':
        return <Table_User />;
      case 'list-rents':
        return <Table_Rent />;
      case 'list-maintenance':
        return <Table_Maintenance />; // Add the new case for maintenance
      case 'add-maintenance':
        return <AddMaintenance />; // Add the new case for add maintenance
      default:
        return null;
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh', marginTop: '-50px' }}>
        {user.role === "Admin" && (
          <h4 className="text-center mb-4">Admin Panel</h4>
        )}
        {user && user.role === 'admin' && (
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button onClick={() => setSelectedPage('dashboard')} className="btn btn-outline-light w-100 d-flex align-items-center">
                <FaTachometerAlt className="me-2" /> Dashboard
              </button>
            </li>
            <li className="nav-item mb-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" className="w-100 d-flex align-items-center">
                  <FaUser className="me-2" /> Users
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelectedPage('list-users')}>
                    <FaUser className="me-2" /> Users List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item mb-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" className="w-100 d-flex align-items-center">
                  <FaCar className="me-2" /> Cars
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelectedPage('add-car')}>
                    <FaPlusCircle className="me-2" /> Add Car
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedPage('list-cars')}>
                    <FaCar className="me-2" /> List Cars
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item mb-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" className="w-100 d-flex align-items-center">
                  <FaClipboardCheck className="me-2" /> Rents
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelectedPage('list-rents')}>
                    <FaClipboardCheck className="me-2" /> List Rents
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item mb-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" className="w-100 d-flex align-items-center">
                  <FaWrench className="me-2" /> Maintenance
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelectedPage('list-maintenance')}>
                    <FaWrench className="me-2" /> List Maintenance
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedPage('add-maintenance')}>
                    <FaPlusCircle className="me-2" /> Add Maintenance
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;