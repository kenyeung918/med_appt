import React, { useState } from "react";
import "./AppointmentForm.css"; // add a CSS file for styling

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      phoneNumber,
      selectedSlot,
      doctorName,
      doctorSpeciality,
    });
    setName("");
    setPhoneNumber("");
    setSelectedSlot(null);
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h3>
        Book Appointment with {doctorName} ({doctorSpeciality})
      </h3>

      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Select a Time Slot:</label>
        {["10:00 AM", "11:00 AM", "2:00 PM"].map((slot) => (
          <button
            type="button"
            key={slot}
            className={`slot-btn ${selectedSlot === slot ? "selected" : ""}`}
            onClick={() => handleSlotSelection(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <button type="submit" disabled={!selectedSlot}>
        Book Now
      </button>
    </form>
  );
};

export default AppointmentForm;

