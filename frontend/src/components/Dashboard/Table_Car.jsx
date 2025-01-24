import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { Button, Table, Form, Container, Pagination } from 'react-bootstrap';

const Table_Car = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/cars');
      setCars(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette voiture ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/cars/${id}`);
        setCars(cars.filter(car => car.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCars = cars.filter(car =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.gearbox.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.fuel_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.price.toString().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <center>
        <ReactLoading type="bars" color="red" height={'4%'} width={'4%'} />
      </center>
    );
  }

  if (isError) {
    return <div className="text-center text-danger">Erreur de réseau</div>;
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Car List</h3>
      <Form.Group controlId="formSearch" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search ..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add">
          <Button className="btn btn-success">
            <i className="fa fa-plus"></i> Add Car
          </Button>
        </Link>
      </div>
      <Table striped bordered hover responsive className="table-light">
        <thead className="thead-dark sticky-top">
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Gearbox</th>
            <th>Fuel Type</th>
            <th>Price</th>
            <th>Available</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {currentCars.map(car => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>
                <img
                  src={car.photo1}
                  alt={`${car.brand} ${car.model}`}
                  width="100"
                  className="img-fluid"
                />
              </td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.gearbox}</td>
              <td>{car.fuel_type}</td>
              <td>{car.price} $</td>
              <td>{car.available ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/edit/${car.id}`}>
                  <Button variant="primary" className="btn-sm me-2">Edit</Button>
                </Link>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => handleDelete(car.id)}
                >
                  🗑
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center mt-3">
        {Array.from({ length: Math.ceil(filteredCars.length / itemsPerPage) }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Table_Car;
