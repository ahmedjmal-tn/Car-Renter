import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ListCars from './components/cars/ListCars';
import './App.css';
import Menu from './components/Menu';
import Footer from './components/Footer';
import HomePage from './components/cars/HomePage';
import CarRentalPage from './components/cars/CarRentalPage';
import LoginPage from './components/Auth/LoginPage';
import SignUpPage from './components/Auth/SignUpPage';
import Dashboard from './components/Dashboard/Dashboard';
import AddCar from './components/Dashboard/AddCar';
import UpdateCar from './components/Dashboard/UpdateCar';
import Table_User from './components/Dashboard/Table_User';
import Table_Car from './components/Dashboard/Table_Car';
import Table_Rent from './components/Dashboard/Table_Rent';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthContext';
import SearchResults from './components/cars/SearchResults';
import SuccessPage from './components/cars/SuccessPage';
import Table_Maintenance from './components/Dashboard/Table_Maintenance';
import AddMaintenance from './components/Dashboard/AddMaintenance';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ConditionalMenu />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cars" element={<ProtectedRoute><ListCars /></ProtectedRoute>} />
          <Route path="/reserve/:id" element={<ProtectedRoute><CarRentalPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/add-car" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/dashboard/list-cars" element={<ProtectedRoute><Table_Car /></ProtectedRoute>} />
          <Route path="/dashboard/list-users" element={<ProtectedRoute><Table_User /></ProtectedRoute>} />
          <Route path="/dashboard/list-rents" element={<ProtectedRoute><Table_Rent /></ProtectedRoute>} />
          <Route path="/dashboard/list-maintenance" element={<ProtectedRoute><Table_Maintenance /></ProtectedRoute>} />
          <Route path="/dashboard/add-maintenance" element={<ProtectedRoute><AddMaintenance /></ProtectedRoute>} /> {/* Add the new route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><UpdateCar /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <ConditionalFooter />
      </Router>
    </AuthProvider>
  );
}

function ConditionalMenu() {
  const location = useLocation();
  const hideMenuPaths = ["/login", "/signup", "/add", "/edit","/success"];
  return !hideMenuPaths.some(path => location.pathname.startsWith(path)) ? <Menu /> : null;
}

function ConditionalFooter() {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/signup", "/dashboard", "/add", "/edit","/success"];
  return !hideFooterPaths.some(path => location.pathname.startsWith(path)) ? <Footer /> : null;
}

export default App;