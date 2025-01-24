import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CarRentalPage.css";
import { AuthContext } from "../auth/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";

// Charger Stripe avec la clé publique
const stripePromise = loadStripe("pk_test_51QiYqyAMVwYVRU1rk3QD5PIPZEuLgDY2842i3Fj6uiXRgv4yeOANQY5FJgPzi1GwGIs3W8xdkilebr7vvMbGSWfC00i1K7raoh");

const CarRentalPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [rentalDate, setRentalDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const stripe = useStripe();

  useEffect(() => {
    // Fetch car details
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cars/${id}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    // Fetch availabilities
    const fetchAvailabilities = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/car-availabilities?car_id=${id}`);
        const data = await response.json();
        setAvailabilities(data.data);
      } catch (error) {
        console.error("Error fetching car availabilities:", error);
      }
    };

    fetchCarData();
    fetchAvailabilities();
  }, [id]);

  const getRentedDates = () => {
    const rentedDates = [];
    availabilities.forEach((availability) => {
      if (availability.car_id === parseInt(id)) {
        const start = new Date(availability.start_date);
        const end = new Date(availability.end_date);
        let currentDate = start;

        while (currentDate <= end) {
          rentedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });
    return rentedDates;
  };

  const rentedDates = getRentedDates();

  const calculateTotalCost = (rentalDate, returnDate) => {
    if (rentalDate && returnDate && car) {
      const timeDiff = Math.abs(returnDate - rentalDate);
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      return daysDiff * car.price;
    }
    return 0;
  };

  useEffect(() => {
    setTotalCost(calculateTotalCost(rentalDate, returnDate));
  }, [rentalDate, returnDate, car]);

  const handleConfirmRent = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const rentData = {
      rental_date: rentalDate.toISOString().split("T")[0],
      return_date: returnDate.toISOString().split("T")[0],
      user_id: user.id,
      car_id: id,
    };

    try {
      const items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${car.model} ${car.brand}`,
              images: car.photo1 ? [car.photo1] : [],
            },
            unit_amount: Math.round(totalCost * 100),
          },
          quantity: 1,
        },
      ];

      // Create a payment session
      const response = await fetch("http://localhost:8000/api/processpayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          line_items: items,
          success_url: `${window.location.origin}/success?rentData=${encodeURIComponent(
            JSON.stringify(rentData)
          )}`,
          cancel_url: `${window.location.origin}/car-rental/${id}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment processing failed");
      }

      const data = await response.json();

      if (data.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (result.error) {
          throw new Error(result.error.message);
        }
      } else {
        throw new Error("Failed to retrieve session ID");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(`Payment failed: ${error.message}`);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rental-container">
      <div className="car-image">
        <img src={car.photo1} alt={car.model} />
      </div>
      <div className="rental-info">
        <h2>
          {car.model} {car.brand}
        </h2>
        <div className="date-inputs">
          <label>
            Rental date
            <DatePicker
              selected={rentalDate}
              onChange={(date) => setRentalDate(date)}
              excludeDates={rentedDates}
              dateFormat="yyyy-MM-dd"
              dayClassName={(date) =>
                rentedDates.some(
                  (rentedDate) =>
                    rentedDate.getDate() === date.getDate() &&
                    rentedDate.getMonth() === date.getMonth() &&
                    rentedDate.getFullYear() === date.getFullYear()
                )
                  ? "react-datepicker__day--rented"
                  : undefined
              }
            />
          </label>
          <label>
            Return date
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              excludeDates={rentedDates}
              dateFormat="yyyy-MM-dd"
              dayClassName={(date) =>
                rentedDates.some(
                  (rentedDate) =>
                    rentedDate.getDate() === date.getDate() &&
                    rentedDate.getMonth() === date.getMonth() &&
                    rentedDate.getFullYear() === date.getFullYear()
                )
                  ? "react-datepicker__day--rented"
                  : undefined
              }
            />
          </label>
        </div>
        <div className="details">
          <p>
            <strong>Gearbox:</strong> {car.gearbox}
          </p>
          <p>
            <strong>Type:</strong> {car.fuel_type}
          </p>
        </div>
        <div className="total">
          <p>Total</p>
          <h3>${totalCost.toFixed(2)} USD</h3>
        </div>
        <button className="confirm-btn" onClick={handleConfirmRent}>
          Confirm Rent
        </button>
      </div>
    </div>
  );
};

const Wrapper = (props) => (
  <Elements stripe={stripePromise}>
    <CarRentalPage {...props} />
  </Elements>
);

export default Wrapper;
