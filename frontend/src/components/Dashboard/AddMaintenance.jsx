import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddMaintenance = () => {
  const [maintenance, setMaintenance] = useState({
    car_id: '',
    maintenance_date: '',
    description: '',
    cost: '',
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/maintenances', maintenance);
      setShowModal(true);
    } catch (error) {
      console.error("Error adding the maintenance", error);
    }
  };

  const handleReset = () => {
    setMaintenance({
      car_id: '',
      maintenance_date: '',
      description: '',
      cost: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/dashboard/list-maintenance');
  };

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">🔧 <strong>Add Maintenance</strong></h3>
      <Form onSubmit={handleSave} className="p-4 border rounded shadow-sm bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Car ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the car ID"
            value={maintenance.car_id}
            onChange={(e) => setMaintenance({ ...maintenance, car_id: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maintenance Date</Form.Label>
          <Form.Control
            type="date"
            value={maintenance.maintenance_date}
            onChange={(e) => setMaintenance({ ...maintenance, maintenance_date: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the description"
            value={maintenance.description}
            onChange={(e) => setMaintenance({ ...maintenance, description: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cost (€)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter the cost"
            value={maintenance.cost}
            onChange={(e) => setMaintenance({ ...maintenance, cost: e.target.value })}
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="success" type="submit">
            <i className="fa-regular fa-floppy-disk"></i> Save
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            <i className="fa-solid fa-rotate-left"></i> Reset
          </Button>
        </div>
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Maintenance Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          🔧 The maintenance has been added successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddMaintenance;