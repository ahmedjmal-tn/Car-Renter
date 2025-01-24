// SuccessPage.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const rentData = JSON.parse(decodeURIComponent(queryParams.get("rentData")));

    const confirmRent = async () => {
        fetch('http://localhost:8000/api/rents', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(rentData),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert('Rent confirmed successfully!');
                navigate('/cars'); // Navigate to the rents page or any other page
              } else {
                navigate('/cars'); 
              }
            })
            .catch((error) => console.error('Error confirming rent:', error));
    };

    confirmRent();
  }, [location, navigate]);



  return <div>Processing your rental, please wait...</div>;
};

export default SuccessPage;
