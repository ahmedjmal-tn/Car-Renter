import React from 'react';
import './home.css';
import ListCars from './ListCars'; // Assurez-vous que le chemin est correct
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Rent Car</h1>
          <p>Rent the car of your dreams at competitive prices.</p>
          <Link to="/cars">
            <button className="cta-button">View Cars</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src="src/img/2.png" alt="Hero" />
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="featured-vehicles">
        <h2>Featured Vehicles</h2>
        {/* Désactivation de la pagination via `showPagination` */}
        <ListCars limit={3} showPagination={false} />
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="why-choose-us-cards">
          <div className="why-choose-us-card">
            <img src="src/img/large.png" alt="Large Selection" />
            <h3>Large Selection</h3>
            <p>We offer a wide selection of vehicles to meet all your needs.</p>
          </div>
          <div className="why-choose-us-card">
            <img src="src/img/prix.png" alt="Competitive Prices" />
            <h3>Competitive Prices</h3>
            <p>Competitive prices to make your rental experience affordable.</p>
          </div>
          <div className="why-choose-us-card">
            <img src="src/img/service.png" alt="Exceptional Customer Service" />
            <h3>Exceptional Customer Service</h3>
            <p>Exceptional customer service to assist you every step of the way.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <img src="src/img/client.jpg" alt="Satisfied Client" />
            <p>"Incredible service and quality cars!"</p>
            <h3>Satisfied Client</h3>
          </div>
          <div className="testimonial-card">
            <img src="src/img/client2.jpg" alt="Satisfied Client" />
            <p>"I highly recommend Rent_Car."</p>
            <h3>Satisfied Client</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
