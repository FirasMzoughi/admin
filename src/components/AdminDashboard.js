import React, { Component } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

class AdminDashboard extends Component {
  state = {
    reservations: []
  };

  async componentDidMount() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/reservations`);
    this.setState({ reservations: response.data });
  }

  handleAccept = async (id) => {
    await axios.patch(`${process.env.REACT_APP_API_URL}/reservations/${id}/status`, { status: 'Accepted' });
    this.setState(prevState => ({
      reservations: prevState.reservations.map(reservation =>
        reservation._id === id ? { ...reservation, status: 'Accepted' } : reservation
      )
    }));
  };

  handleDecline = async (id) => {
    await axios.patch(`${process.env.REACT_APP_API_URL}/reservations/${id}/status`, { status: 'Declined' });
    this.setState(prevState => ({
      reservations: prevState.reservations.map(reservation =>
        reservation._id === id ? { ...reservation, status: 'Declined' } : reservation
      )
    }));
  };

  render() {
    return (
      <div className="dashboard-container">
        <h2>Tableau de Bord de l'Administrateur</h2>
        <div className="reservations-list">
          {this.state.reservations.map(reservation => (
            <div key={reservation._id} className="reservation-card">
              <h3>{reservation.nameprenom}</h3>
              <p>Email: {reservation.email}</p>
              <p>Numéro: {reservation.numero}</p>
              <p>Âge: {reservation.age}</p>
              <p>Sexe: {reservation.sexe}</p>
              <p>Pays: {reservation.pays}</p>
              <p>Date: {reservation.date}</p>
              <p>Status: <span className={`status ${reservation.status.toLowerCase()}`}>{reservation.status}</span></p>
              <div className="reservation-actions">
                <button className="accept-button" onClick={() => this.handleAccept(reservation._id)}>Accepter</button>
                <button className="decline-button" onClick={() => this.handleDecline(reservation._id)}>Décliner</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
