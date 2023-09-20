import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt, faUserCog, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const history = useHistory();

  const handleArrowLeftClick = () => {
    history.push('/');
  };

  const handleArrowLeftKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      history.push('/');
    }
  };

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div
          className="left"
          onClick={handleArrowLeftClick}
          onKeyDown={handleArrowLeftKeyDown}
          role="button"
          tabIndex="0"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="arrow-left" />
          <p className="case-year">2023</p>
        </div>

        <p className="continent-name">WORLD COVID CASES</p>

        <div className="right">
          <FontAwesomeIcon icon={faMicrophoneAlt} />
          <FontAwesomeIcon icon={faUserCog} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
