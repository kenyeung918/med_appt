import React, { useState, useEffect } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const FindDoctorSearch = ({ onSearch }) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch distinct specialities from backend
    fetch("/api/specialities")
      .then(res => res.json())
      .then(data => setSpecialities(data))
      .catch(() => {
        // fallback if API not ready
        setSpecialities([
          'Dentist', 'Gynecologist/Obstetrician', 'General Physician',
          'Dermatologist', 'Ear-Nose-Throat Specialist', 'Homeopath', 'Ayurveda'
        ]);
      });
  }, []);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`/BookingConsultation?speciality=${speciality}`);
    // No reload needed — React Router handles re-render
  };

  return (
    <div className='finddoctor'>
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div>
          <i style={{color:'#000000',fontSize:'20rem'}} className="fa fa-user-md"></i>
        </div>
        <div className="home-search-container" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setDoctorResultHidden(true)}
              value={searchDoctor}
              onChange={(e) => {
                setSearchDoctor(e.target.value);
                onSearch(e.target.value);
              }}
            />
            <div className="findiconimg">
              <img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt=""/>
            </div>
            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {specialities.map(speciality => (
                <div
                  className="search-doctor-result-item"
                  key={speciality}
                  onMouseDown={() => handleDoctorSelect(speciality)}
                >
                  <span>
                    <img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{height:"10px", width:"10px"}} />
                  </span>
                  <span>{speciality}</span>
                  <span>SPECIALITY</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;
