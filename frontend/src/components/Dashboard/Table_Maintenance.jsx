import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { Button, Table, Container } from 'react-bootstrap';

const Table_Maintenance = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchCarsInMaintenance();
  }, []);

  const fetchCarsInMaintenance = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/maintenances');
      console.log(res.data); // Vérifiez la réponse de l'API
      const carsData = await Promise.all(
        res.data.data.map(async (maintenance) => {
          const carRes = await axios.get(`http://localhost:8000/api/cars/${maintenance.car_id}`);
          return carRes.data;
        })
      );
      setCars(carsData); // Assurez-vous de définir les données correctement
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleCompleteMaintenance = async (carId) => {
    try {
      await axios.put(`http://localhost:8000/api/maintenances/${carId}/complete`);
      fetchCarsInMaintenance(); // Refresh the list after updating
    } catch (error) {
      console.error('Error completing maintenance:', error);
    }
  };

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
      <h3 className="mb-4 text-center">Cars in Maintenance</h3>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/dashboard/add-maintenance">
          <Button className="btn btn-success">
            <i className="fa fa-plus"></i> Add Maintenance
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
            <th>Rental Count</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cars) && cars.map(car => (
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
              <td>{car.rental_count}</td>
              <td>
                <Link to={`/edit/${car.id}`}>
                  <Button variant="primary" className="btn-sm me-2">Edit</Button>
                </Link>
                <Button
                  variant="success"
                  className="btn-sm"
                  onClick={() => handleCompleteMaintenance(car.id)}
                >
                  Complete Maintenance
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Table_Maintenance;