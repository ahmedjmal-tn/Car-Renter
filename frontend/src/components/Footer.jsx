import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Section À propos */}
          <div className="col-md-4">
            <h5 className="text-uppercase mb-3">About Rent Car</h5>
            <p>
              Rent Car is your trusted partner for finding the perfect car for
              your needs. Whether for business or leisure, we offer a wide range of vehicles to suit your style and budget.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="col-md-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/cars" className="text-white text-decoration-none">
                  Cars
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts et réseaux sociaux */}
          <div className="col-md-4">
            <h5 className="text-uppercase mb-3">Contact Us</h5>
            <p className="mb-1">
              <strong>Address:</strong> 123 Rent Street, Tunisia, Sfax
            </p>
            <p className="mb-1">
              <strong>Email:</strong>{" "}
              <a href="mailto:support@rentcar.com" className="text-white text-decoration-none">
                support@rentwheels.com
              </a>
            </p>
            <p className="mb-3">
              <strong>Phone:</strong> +216 (123) 456-7890
            </p>
            <div>
              <a
                href="https://facebook.com"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 border-top pt-3">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Rent Car. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
