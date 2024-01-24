import React, { useState, useEffect } from 'react';

const Register = () => {
  const [activeTab, setActiveTab] = useState('user');

  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [artistFormData, setArtistFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    artistType: [],
    artistServices: [],
  });

  const [artistTypes, setArtistTypes] = useState([]);
  const [artistServices, setArtistServices] = useState([]);

  useEffect(() => {
    // Fetch artist types from your API endpoint
    const fetchArtistTypes = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'artist-type-list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
          },
          // You may include credentials, mode, etc. based on your API requirements
        });

        if (response.ok) {
          const data = await response.json();
          setArtistTypes(data.artistTypes);
        } else {
          console.error('Failed to fetch artist types:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch artist types:', error);
      }
    };


    const fetchArtistServices = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_API_URL + 'artist-service-list', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
            },
            // You may include credentials, mode, etc. based on your API requirements
          });
  
          if (response.ok) {
            const data = await response.json();
            setArtistServices(data['artistServices']);
          } else {
            console.error('Failed to fetch artist services:', response.statusText);
          }
        } catch (error) {
          console.error('Error during fetch artist services:', error);
        }
      };
  
      fetchArtistTypes();
      fetchArtistServices();
    
  }, []);


  const handleUserRegister = () => {
    // Handle user registration logic
    console.log('User registration:', userFormData);
  };

  const handleArtistRegister = () => {
    // Handle artist registration logic
    console.log('Artist registration:', artistFormData);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')}>
            User
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'artist' ? 'active' : ''}`} onClick={() => setActiveTab('artist')}>
            Artist
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        <div className={`tab-pane ${activeTab === 'user' ? 'active' : ''}`}>
          <h2>User Registration</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={userFormData.firstName}
                onChange={(e) => setUserFormData({ ...userFormData, firstName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={userFormData.lastName}
                onChange={(e) => setUserFormData({ ...userFormData, lastName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={userFormData.email}
                onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={userFormData.password}
                onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={userFormData.confirmPassword}
                onChange={(e) => setUserFormData({ ...userFormData, confirmPassword: e.target.value })}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUserRegister}>
              Register 
            </button>
          </form>
        </div>

        <div className={`tab-pane ${activeTab === 'artist' ? 'active' : ''}`}>
          <h2>Artist Registration</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="firstNameArtist" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstNameArtist"
                value={artistFormData.firstName}
                onChange={(e) => setArtistFormData({ ...artistFormData, firstName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastNameArtist" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastNameArtist"
                value={artistFormData.lastName}
                onChange={(e) => setArtistFormData({ ...artistFormData, lastName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailArtist" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailArtist"
                value={artistFormData.email}
                onChange={(e) => setArtistFormData({ ...artistFormData, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordArtist" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordArtist"
                value={artistFormData.password}
                onChange={(e) => setArtistFormData({ ...artistFormData, password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPasswordArtist" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPasswordArtist"
                value={artistFormData.confirmPassword}
                onChange={(e) => setArtistFormData({ ...artistFormData, confirmPassword: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="artistType" className="form-label">
                Artist Type
              </label>
              <select
                multiple
                className="form-control"
                id="artistType"
                value={artistFormData.artistType}
                onChange={(e) => setArtistFormData({ ...artistFormData, artistType: Array.from(e.target.selectedOptions, (option) => option.value) })}
              >
                {artistTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="artistServices" className="form-label">
                Artist Services
              </label>
              <select
                multiple
                className="form-control"
                id="artistServices"
                value={artistFormData.artistServices}
                onChange={(e) => setArtistFormData({ ...artistFormData, artistServices: Array.from(e.target.selectedOptions, (option) => option.value) })}
              >
                {artistServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleArtistRegister}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
