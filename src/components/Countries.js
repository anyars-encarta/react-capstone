// Countries.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import '../styles/Countries.css';

function Countries() {
  const { continentName } = useParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  let totalCases = 0;
  let totalRecoveries = 0;
  let totalDeaths = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://corona.lmao.ninja/v2/countries');
        const data = await response.json();
        setCountries(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  countries.forEach((country) => {
    totalCases += parseInt(country.cases, 10);
    totalRecoveries += parseInt(country.recovered, 10);
    totalDeaths += parseInt(country.deaths, 10);
  });

  const formatNumber = (number) => number.toLocaleString();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="top-stats">
        <div className="top">
          <p className="continental">Continent Stats</p>
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
      <div className="country-container">
        {continentName ? (
          countries
            .filter((country) => country.continent === continentName)
            .map((country) => (
              <div key={country.country} className="country">
                {/* Display country information here */}
                <div className="info">
                  <p className="country-name">{country.country}</p>
                  <p className="cases-count">
                    Cases:
                    {' '}
                    {formatNumber(country.cases)}
                  </p>
                </div>
                <FontAwesomeIcon icon={faCircleRight} className="view-more" />
              </div>
            ))
        ) : (
          <div />
        )}
      </div>
    </>
  );
}

export default Countries;
