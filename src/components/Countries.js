import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import '../styles/Countries.css';

function Countries() {
  const { continentName } = useParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [continentStats, setContinentStats] = useState({
    totalCases: 0,
    totalRecoveries: 0,
    totalDeaths: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://corona.lmao.ninja/v2/countries');
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate continent-specific stats
    const continentStatsData = countries
      .filter((country) => country.continent === continentName)
      .reduce((stats, country) => ({
        ...stats,
        totalCases: stats.totalCases + parseInt(country.cases, 10),
        totalRecoveries: stats.totalRecoveries + parseInt(country.recovered, 10),
        totalDeaths: stats.totalDeaths + parseInt(country.deaths, 10),
      }), {
        totalCases: 0,
        totalRecoveries: 0,
        totalDeaths: 0,
      });
    setContinentStats(continentStatsData);
  }, [continentName, countries]);

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
          <p className="continental">
            Stats for
            {' '}
            {continentName}
          </p>
          <p className="count">
            Cases:
            {' '}
            {formatNumber(continentStats.totalCases)}
          </p>
          <p className="count">
            Recoveries:
            {' '}
            {formatNumber(continentStats.totalRecoveries)}
          </p>
          <p className="count">
            Deaths:
            {' '}
            {formatNumber(continentStats.totalDeaths)}
          </p>
        </div>
        <FontAwesomeIcon icon={faCircleRight} className="arrow-right" />
      </div>
      <p className="continent-stats">COUNTRIES STATS</p>
      <div className="country-container">
        {continentName ? (
          countries
            .filter((country) => country.continent === continentName)
            .map((country) => (
              <div key={country.country} className="country">
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
