/* global use, db */
// MongoDB Playground

const database = "stayhealthybeta1";
const collection = "doctors";

// Switch to the database
use(database);

// Create the doctors collection
db.createCollection(collection);

// Insert multiple doctors grouped by speciality
db.doctors.insertMany([
  // Dentists
  { name: "Dr. Denis Raj", speciality: "Dentist", experience: 10, ratings: 4.5, phoneNumber: "1234567890" },
  { name: "Dr. Emily Wong", speciality: "Dentist", experience: 7, ratings: 4.2, phoneNumber: "1234567891" },
  { name: "Dr. Michael Chan", speciality: "Dentist", experience: 15, ratings: 4.8, phoneNumber: "1234567892" },

  // Gynecologists
  { name: "Dr. Anita Wong", speciality: "Gynecologist/Obstetrician", experience: 12, ratings: 4.7, phoneNumber: "2345678901" },
  { name: "Dr. Sarah Lee", speciality: "Gynecologist/Obstetrician", experience: 9, ratings: 4.4, phoneNumber: "2345678902" },

  // General Physicians
  { name: "Dr. Peter Chan", speciality: "General Physician", experience: 8, ratings: 4.3, phoneNumber: "3456789012" },
  { name: "Dr. David Ng", speciality: "General Physician", experience: 20, ratings: 4.9, phoneNumber: "3456789013" },
  { name: "Dr. Karen Ho", speciality: "General Physician", experience: 5, ratings: 4.1, phoneNumber: "3456789014" },

  // Dermatologists
  { name: "Dr. Alice Lee", speciality: "Dermatologist", experience: 15, ratings: 4.8, phoneNumber: "4567890123" },
  { name: "Dr. Jason Lau", speciality: "Dermatologist", experience: 6, ratings: 4.2, phoneNumber: "4567890124" },

  // ENT Specialists
  { name: "Dr. Ravi Kumar", speciality: "Ear-Nose-Throat Specialist", experience: 9, ratings: 4.4, phoneNumber: "5678901234" },
  { name: "Dr. Helen Wong", speciality: "Ear-Nose-Throat Specialist", experience: 11, ratings: 4.6, phoneNumber: "5678901235" },

  // Homeopaths
  { name: "Dr. Maria Silva", speciality: "Homeopath", experience: 11, ratings: 4.6, phoneNumber: "6789012345" },
  { name: "Dr. Rajesh Patel", speciality: "Homeopath", experience: 8, ratings: 4.3, phoneNumber: "6789012346" },

  // Ayurveda
  { name: "Dr. Arjun Patel", speciality: "Ayurveda", experience: 14, ratings: 4.7, phoneNumber: "7890123456" },
  { name: "Dr. Priya Sharma", speciality: "Ayurveda", experience: 10, ratings: 4.5, phoneNumber: "7890123457" }
]);
