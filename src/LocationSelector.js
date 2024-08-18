import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch countries when the component mounts
    axios.get('https://crio-location-selector.onrender.com/countries')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states when a country is selected
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => setStates(response.data))
        .catch(error => console.error('Error fetching states:', error));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      // Fetch cities when a state is selected
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [selectedCountry, selectedState]);

  return (<>
    <div className="selector-container">
  <label>Select Country:</label>
  <select
    value={selectedCountry}
    onChange={(e) => {
      setSelectedCountry(e.target.value);
      setSelectedState(''); // Reset state and city when a new country is selected
      setCities([]);
    }}
  >
    <option value="">--Select Country--</option>
    {countries.map((country) => (
      <option key={country} value={country}>{country}</option>
    ))}
  </select>

  <label>Select State:</label>
  <select
    value={selectedState}
    onChange={(e) => {
      setSelectedState(e.target.value);
      setSelectedCity(''); // Reset city when a new state is selected
    }}
    disabled={!selectedCountry}
  >
    <option value="">--Select State--</option>
    {states.map((state) => (
      <option key={state} value={state}>{state}</option>
    ))}
  </select>

  <label>Select City:</label>
  <select
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    disabled={!selectedState}
  >
    <option value="">--Select City--</option>
    {cities.map((city) => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>
</div>

<div className="selection-result">
  {selectedCity && selectedState && selectedCountry && (
    <>
      You selected <span>{selectedCity}</span>, <span>{selectedState}</span>, <span>{selectedCountry}</span>
    </>
  )}
</div>
</>
  );
};

export default LocationSelector;
