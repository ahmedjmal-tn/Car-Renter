import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

const Table_Rent = () => {
  const [rents, setRents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [usernames, setUsernames] = useState({}); // Stocker les noms des utilisateurs par ID
  const [carDetails, setCarDetails] = useState({}); // Stocker les détails des voitures par ID

  useEffect(() => {
    // Charger les locations
    fetch('http://localhost:8000/api/rents')
      .then((response) => response.json())
      .then((data) => {
        setRents(data.data); // Assurez-vous que 'data.data' correspond à la structure des données
        setIsLoading(false);

        // Charger les informations des utilisateurs
        const userIds = [...new Set(data.data.map((rent) => rent.user_id))]; // Obtenir les IDs utilisateurs uniques
        userIds.forEach((id) => {
          fetch(`http://localhost:8000/api/user/${id}`)
            .then((response) => response.json())
            .then((userData) => {
              setUsernames((prev) => ({
                ...prev,
                [id]: userData.user.firstname, // Assigner le prénom à l'ID utilisateur
              }));
            })
            .catch((error) =>
              console.error(`Erreur lors du chargement de l'utilisateur ${id}:`, error)
            );
        });

        // Charger les informations des voitures
        const carIds = [...new Set(data.data.map((rent) => rent.car_id))]; // Obtenir les IDs voitures uniques
        carIds.forEach((id) => {
          fetch(`http://localhost:8000/api/cars/${id}`)
            .then((response) => response.json())
            .then((carData) => {
              setCarDetails((prev) => ({
                ...prev,
                [id]: `${carData.brand} ${carData.model}`, // Assigner marque et modèle à l'ID voiture
              }));
            })
            .catch((error) =>
              console.error(`Erreur lors du chargement de la voiture ${id}:`, error)
            );
        });
      })
      .catch((error) => {
        console.error('Erreur de réseau pour les locations:', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const filteredRents = rents.filter((rent) =>
    `${usernames[rent.user_id] || rent.user_id} ${carDetails[rent.car_id] || rent.car_id} ${rent.start_date} ${rent.end_date}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <center>
        <ReactLoading type="bars" color="red" height={'4%'} width={'4%'} />
      </center>
    );
  }

  if (isError) {
    return <div>Erreur de réseau</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Liste des locations</h1>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Recherche ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nom Utilisateur</th>
            <th>Voiture</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Prix Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredRents.map((rent) => (
            <tr key={rent.id}>
              <td>{rent.id}</td>
              <td>{usernames[rent.user_id] || 'Chargement...'}</td> {/* Afficher le prénom ou "Chargement..." */}
              <td>{carDetails[rent.car_id] || 'Chargement...'}</td> {/* Afficher la voiture ou "Chargement..." */}
              <td>{rent.start_date}</td>
              <td>{rent.end_date}</td>
              <td>{rent.total_price} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredRents.length === 0 && (
        <p className="text-center text-muted">Aucune location trouvée.</p>
      )}
    </div>
  );
};

export default Table_Rent;
