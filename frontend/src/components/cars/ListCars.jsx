import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './list.css';

const ListCars = ({ cars: initialCars, limit = 8, showPagination = true }) => {
  const [cars, setCars] = useState(initialCars || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoverImages, setHoverImages] = useState([]);

  useEffect(() => {
    if (!initialCars) {
      fetchCars();
    } else {
      setCars(initialCars);
      setHoverImages(new Array(initialCars.length).fill(null));
    }
  }, [initialCars]);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/cars");
      setCars(res.data);
      setHoverImages(new Array(res.data.length).fill(null));
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseEnter = (index) => {
    const newHoverImages = [...hoverImages];
    newHoverImages[index] = index;
    setHoverImages(newHoverImages);
  };

  const handleMouseLeave = (index) => {
    const newHoverImages = [...hoverImages];
    newHoverImages[index] = null;
    setHoverImages(newHoverImages);
  };

  const indexOfLastCar = currentPage * limit;
  const indexOfFirstCar = indexOfLastCar - limit;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(cars.length / limit);

  return (
    <main className="card-container">
      {currentCars.map((car, index) => (
        <div
          className="card"
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <img
            src={hoverImages[index] === index ? car.photo2 : car.photo1}
            alt={`${car.brand} ${car.model}`}
            className="card-image"
          />
          <div className="card-body">
            <h1 className="card-title">{car.model} {car.brand}</h1>
            <p
              className={`card-availability ${car.available ? 'available' : 'not-available'}`}
            >
              {car.available ? 'Available' : 'Not Available'}
            </p>
            <p className="card-price">${car.price} /day</p>
            {car.available === 1 && (
              <Link to={`/reserve/${car.id}`} className="btn">
                Rent Now
              </Link>
            )}
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      {showPagination && (
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </main>
  );
};

export default ListCars;

/* Inline CSS for wow effect */
