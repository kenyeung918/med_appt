// Import necessary modules from React library
import React from "react";

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from "./Components/Navbar/Navbar";

// Import page components
import LandingPage from './Components/Landing_Page/Landing_Page';
import Login from "./Components/Login/Login";
import SignUp from "./Components/Sign_Up/Sign_Up";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";
import Notification from "./Components/Notification/Notification";
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch";
import BookingConsultation from "./Components/BookingConsultation";
// import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";



import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Display the Navbar component */}
        <Navbar />
        
        {/* Define routes for different pages */}
        <Routes>          
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />    
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/notification" element={<Notification />} />  
          <Route path="/find-doctor" element={<FindDoctorSearch />} />                    
          <Route path="/booking-consultation" element={<BookingConsultation />} />
          {/* <Route path="/reports" element={<ReportsLayout />} /> */}           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
