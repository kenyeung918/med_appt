const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

// Doctor schema
const doctorSchema = new mongoose.Schema({
  name: String,
  speciality: String,
  experience: Number,
  ratings: Number,
  phoneNumber: String,
  profilePic: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);

// Appointment schema
const appointmentSchema = new mongoose.Schema({
  doctorName: String,
  doctorSpeciality: String,
  patientName: String,
  phoneNumber: String,
  slot: String,
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Routes
app.use('/api/auth', require('./routes/auth'));

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Get doctors (optionally filter by speciality)
app.get("/api/doctors", async (req, res) => {
  try {
    const { speciality } = req.query;
    let query = {};
    if (speciality) {
      query = { speciality: new RegExp(`^${speciality}$`, "i") };
    }
    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// Get distinct specialities
app.get("/api/specialities", async (req, res) => {
  try {
    const specialities = await Doctor.distinct("speciality");
    res.json(specialities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch specialities" });
  }
});

// Save appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

// Get all appointments
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
