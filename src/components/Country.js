import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import ContinentMap from './ContinentMap';

const Country = ({ name, cases, continentName }) => {
  const backgroundImage = `url(${ContinentMap[continentName]})`;

  return (
    <div className="country" style={{ backgroundImage }}>
      <div className="overlay" />
      <div className="info">
        <p className="country-name">{name}</p>
        <p className="cases-count">
          Cases:
          {'  '}
          {cases}
        </p>
      </div>
      <FontAwesomeIcon icon={faCircleRight} className="view-more" />
    </div>
  );
};

Country.propTypes = {
  name: PropTypes.string.isRequired,
  cases: PropTypes.string.isRequired,
  continentName: PropTypes.string.isRequired,
};

export default Country;
