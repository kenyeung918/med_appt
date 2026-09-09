import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
// import { v4 as uuidv4 } from "uuid";


const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = async (appointmentId) => {
    // Optional: call backend DELETE route here
    const updatedAppointments = appointments.filter(
      (appointment) => appointment._id !== appointmentId
    );
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = async (appointmentData) => {
    try {
      const response = await fetch("http://localhost:8181/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorName: name,
          doctorSpeciality: speciality,
          patientName: appointmentData.name,
          phoneNumber: appointmentData.phoneNumber,
          slot: appointmentData.selectedSlot,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save appointment");
      }

      const savedAppointment = await response.json();

      setAppointments([...appointments, savedAppointment]);
      setShowModal(false);
      alert("✅ Appointment booked successfully!");
    } catch (err) {
      console.error("Error saving appointment:", err);
      alert("❌ Failed to book appointment. Check backend logs.");
    }
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={name} className="doctor-profile-pic" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          )}
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>
        <div>
          <button className="book-appointment-btn" onClick={handleBooking}>
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button>
        </div>
      </div>

      <Popup modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="doctorbg" style={{ height: "100vh", overflow: "scroll" }}>
          <div className="doctor-card-details">
            <div className="doctor-card-detail-name">{name}</div>
            <div className="doctor-card-detail-speciality">{speciality}</div>
            <div className="doctor-card-detail-experience">
              {experience} years experience
            </div>
            <div className="doctor-card-detail-consultationfees">
              Ratings: {ratings}
            </div>
          </div>

          {appointments.length > 0 ? (
            <>
              <h3 style={{ textAlign: "center" }}>Appointment Booked!</h3>
              {appointments.map((appointment) => (
                <div className="bookedInfo" key={appointment._id}>
                  <p>Name: {appointment.patientName}</p>
                  <p>Phone Number: {appointment.phoneNumber}</p>
                  <p>Slot: {appointment.slot}</p>
                  <button onClick={() => handleCancel(appointment._id)}>
                    Cancel Appointment
                  </button>
                </div>
              ))}
            </>
          ) : (
            <AppointmentForm
              doctorName={name}
              doctorSpeciality={speciality}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </Popup>
    </div>
  );
};

export default DoctorCard;

