// Countries.js
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

function Countries() {
  const { continentName } = useParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

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
  );
}

// Countries.propTypes = {
//   continentName: PropTypes.string,
// };

export default Countries;
