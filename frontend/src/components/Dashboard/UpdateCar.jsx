import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UpdateCar = () => {
  const [car, setCar] = useState({
    photo1: '',
    photo2: '',
    brand: '',
    model: '',
    gearbox: '',
    fuel_type: '',
    price: '',
    available: false,
  });
  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchCar = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/cars/${id}`);
      setCar(res.data);
      setFiles1([{ source: res.data.photo1, options: { type: 'local' } }]);
      setFiles2([{ source: res.data.photo2, options: { type: 'local' } }]);
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  useEffect(() => {
    fetchCar(id);
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/cars/${id}`, car);
      navigate('/cars');
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const serverOptions = (fieldName) => {
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function(response) {
          response.blob().then(function(myBlob) {
            load(myBlob);
          });
        });
      },
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
    <Container>
      <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
        <Form onSubmit={handleUpdate}>
          <Row>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
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
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the brand"
                  value={car.brand}
                  onChange={(e) => setCar({ ...car, brand: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the model"
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
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
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price (€)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter the price"
                  value={car.price}
                  onChange={(e) => setCar({ ...car, price: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Available"
                  checked={car.available}
                  onChange={(e) => setCar({ ...car, available: e.target.checked })}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="success" className="btn-sm me-2" type="submit">
              <i className="fa-regular fa-floppy-disk"></i> Save
            </Button>
            <Link to="/cars">
              <Button variant="danger" className="btn-sm">
                <i className="fa-regular fa-circle-xmark"></i> Cancel
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateCar;