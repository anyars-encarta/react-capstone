// Countries.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import {
  setCountries, selectCountries, setError, setLoading,
} from '../redux/countriesSlice';
import '../styles/Countries.css';

function Countries() {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const { continentName } = useParams();
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
        dispatch(setCountries(data));
        dispatch(setError(null));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Check if countries is an array before filtering
    if (Array.isArray(countries.list)) {
      // Calculate continent-specific stats
      const continentStatsData = countries.list
        .filter((country) => country.continent === continentName);
      const continentStatsResult = continentStatsData.reduce((stats, country) => ({
        ...stats,
        totalCases: stats.totalCases + parseInt(country.cases, 10),
        totalRecoveries: stats.totalRecoveries + parseInt(country.recovered, 10),
        totalDeaths: stats.totalDeaths + parseInt(country.deaths, 10),
      }), {
        totalCases: 0,
        totalRecoveries: 0,
        totalDeaths: 0,
      });

      setContinentStats(continentStatsResult);
    }
  }, [continentName, countries]);

  const formatNumber = (number) => number.toLocaleString();

  if (countries.loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (countries.error) {
    return (
      <div>
        Error:
        {countries.error}
      </div>
    ); // Handle error state
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
        <div className="search-container">
          <input type="text" id="text" placeholder="Search countries..." />
          <FontAwesomeIcon icon={faCircleRight} className="arrow-right" />
        </div>
      </div>
      <p className="continent-stats">COUNTRIES STATS</p>
      <div className="country-container">
        {continentName ? (
          countries.list
            .filter((country) => country.continent === continentName)
            .map((country) => (
              <div key={country.country} className="country">
                <div className="overlay" />
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
