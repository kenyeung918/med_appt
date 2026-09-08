import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    setDoctorData(storedDoctorData);
    setAppointmentData(storedAppointmentData);

    // Listen for changes (e.g., appointment canceled)
    const handleStorageChange = () => {
      const updatedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      const updatedAppointmentData = JSON.parse(localStorage.getItem(updatedDoctorData?.name));
      setDoctorData(updatedDoctorData);
      setAppointmentData(updatedAppointmentData);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div>
      <Navbar />
      {children}
      {isLoggedIn && appointmentData && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Upcoming Appointment</h3>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            <p className="appointment-card__message">
              <strong>Date:</strong> {appointmentData?.date}
            </p>
            <p className="appointment-card__message">
              <strong>Time:</strong> {appointmentData?.time}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
