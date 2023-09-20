// Continents.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { setContinents, selectContinents } from '../redux/continentsSlice';
import Countries from './Countries';
import ContinentMap from './ContinentMap';
import '../styles/Continents.css';

function Continents() {
  const dispatch = useDispatch();
  const continents = useSelector(selectContinents);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [showCountries, setShowCountries] = useState(false);

  const history = useHistory(); // Use the useHistory hook

  let totalCases = 0;
  let totalRecoveries = 0;
  let totalDeaths = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://corona.lmao.ninja/v2/continents');
        const data = await response.json();
        dispatch(setContinents(data)); // Dispatch the action to set continents
      } catch (error) {
        throw new Error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (Array.isArray(continents)) {
    continents.forEach((continent) => {
      totalCases += parseInt(continent.cases, 10);
      totalRecoveries += parseInt(continent.recovered, 10);
      totalDeaths += parseInt(continent.deaths, 10);
    });
  }

  const formatNumber = (number) => number.toLocaleString();

  const handleContinentClick = (continentName) => {
    setSelectedContinent(continentName);
    setShowCountries(true);
    history.push(`/countries/${continentName}`);
  };

  return (
    <>
      <div className="top-stats">
        <div className="top">
          <p className="global">Global Stats</p>
          <p className="count">
            Cases:
            {' '}
            {totalCases.toLocaleString()}
          </p>
          <p className="count">
            Recoveries:
            {' '}
            {totalRecoveries.toLocaleString()}
          </p>
          <p className="count">
            Deaths:
            {' '}
            {totalDeaths.toLocaleString()}
          </p>
        </div>
        <FontAwesomeIcon icon={faCircleRight} className="arrow-right" />
      </div>
      <p className="continent-stats">CONTINENT STATS</p>
      <div className="continent-container">
        {continents.map((continent) => (
          <div
            key={continent.continent}
            className="continent"
            style={{ backgroundImage: `url(${ContinentMap[continent.continent]})` }}
            onClick={() => handleContinentClick(continent.continent)}
            role="button" // Add role="button" for accessibility
            tabIndex="0" // Add tabIndex to make it focusable
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Handle Enter key press
                handleContinentClick(continent.continent);
              }
            }}
          >
            <div className="overlay" />
            <div className="info">
              <p className="continent-name">{continent.continent}</p>
              <p className="cases-count">
                Cases:
                {' '}
                {formatNumber(continent.cases)}
              </p>
            </div>
            <FontAwesomeIcon icon={faCircleRight} className="view-more" />
          </div>
        ))}
      </div>
      {showCountries && <Countries continentName={selectedContinent} />}
    </>
  );
}

export default Continents;
