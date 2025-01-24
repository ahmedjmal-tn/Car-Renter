import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddCar = () => {
  const [car, setCar] = useState({
    photo1: '',
    photo2: '',
    brand: '',
    model: '',
    gearbox: '',
    fuel_type: '',
    price: '',
    available: false,
    rental_count: 0, // Initial value for rental_count
  });
  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/cars', car);
      setShowModal(true);
    } catch (error) {
      console.error("Error adding the car", error);
    }
  };

  const handleReset = () => {
    setCar({
      photo1: '',
      photo2: '',
      brand: '',
      model: '',
      gearbox: '',
      fuel_type: '',
      price: '',
      available: false,
      rental_count: 0, // Reset value for rental_count
    });
    setFiles1([]);
    setFiles2([]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/cars');
  };

  const serverOptions = (fieldName) => {
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'frontend');
        data.append('cloud_name', 'dea3u12iy');
        data.append('publicid', file.name);

        axios.post('https://api.cloudinary.com/v1_1/dea3u12iy/image/upload', data)
          .then((response) => response.data)
          .then((data) => {
            setCar((prevCar) => ({ ...prevCar, [fieldName]: data.url }));
            load(data);
          })
          .catch((err) => {
            console.error('Error uploading file:', err);
            error('Upload failed');
            abort();
          });
      },
    };
  };

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">🚗 <strong>Add Car</strong></h3>
      <Form onSubmit={handleSave} className="p-4 border rounded shadow-sm bg-light">
        <h5 className="mb-3 text-muted">Car Information</h5>
        <Form.Group className="mb-3">
          <Form.Label>Photo 1</Form.Label>
          <FilePond
            files={files1}
            acceptedFileTypes="image/*"
            onupdatefiles={setFiles1}
            allowMultiple={false}
            server={serverOptions('photo1')}
            name="photo1"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Photo 2</Form.Label>
          <FilePond
            files={files2}
            acceptedFileTypes="image/*"
            onupdatefiles={setFiles2}
            allowMultiple={false}
            server={serverOptions('photo2')}
            name="photo2"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the brand"
            value={car.brand}
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the model"
            value={car.model}
            onChange={(e) => setCar({ ...car, model: e.target.value })}
          />
        </Form.Group>

        <h5 className="mb-3 text-muted">Characteristics</h5>
        <Form.Group className="mb-3">
          <Form.Label>Gearbox</Form.Label>
          <Form.Select
            value={car.gearbox}
            onChange={(e) => setCar({ ...car, gearbox: e.target.value })}
          >
            <option value="">Choose...</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fuel Type</Form.Label>
          <Form.Select
            value={car.fuel_type}
            onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
          >
            <option value="">Choose...</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price (€)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter the price"
            value={car.price}
            onChange={(e) => setCar({ ...car, price: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Available"
            checked={car.available}
            onChange={(e) => setCar({ ...car, available: e.target.checked })}
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="success" type="submit">
            <i className="fa-regular fa-floppy-disk"></i> Save
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            <i className="fa-solid fa-rotate-left"></i> Reset
          </Button>
          <Link to="/cars">
            <Button variant="danger">
              <i className="fa-regular fa-circle-xmark"></i> Cancel
            </Button>
          </Link>
        </div>
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Car Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          🚗 The car has been added successfully!
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

export default AddCar;