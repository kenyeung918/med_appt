import React, { useEffect, useState } from "react";
import "./BookingConsultation.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./DoctorCard/DoctorCard";




const BookingConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const getDoctorsDetails = async () => {
    try {
      const speciality = searchParams.get("speciality");            
      const res = await fetch(`http://localhost:8181/api/doctors?speciality=${searchParams.get("speciality") || ""}`);
      const data = await res.json();
      setDoctors(data);

      if (speciality) {
        const filtered = data.filter(
          (doctor) => doctor.speciality.toLowerCase() === speciality.toLowerCase()
        );
        setFilteredDoctors(filtered);
        setIsSearched(true);
      } else {
        setFilteredDoctors([]);
        setIsSearched(false);
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getDoctorsDetails();
    // Optional auth check:
    // const authtoken = sessionStorage.getItem("auth-token");
    // if (!authtoken) {
    //   navigate("/login");
    // }
  }, [searchParams]);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearch onSearch={handleSearch} />
        <div className="search-results-container">
          {isSearched && (
            <center>
              <h2>
                {filteredDoctors.length} doctors are available{" "}
                {searchParams.get("location")}
              </h2>
              <h3>
                Book appointments with minimum wait-time & verified doctor
                details
              </h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard
                    className="doctorcard"
                    {...doctor}
                    key={doctor._id}
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          )}
        </div>
      </div>
    </center>
  );
};

export default BookingConsultation;
