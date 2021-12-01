import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoThreeBars } from 'react-icons/go';
import SideBarClient from './SideBarClient';

import './TopBar.css';

function TopBar({ title }) {
  const [activeButton, setActiveButton] = useState(false);

  function handleActive() {
    if (activeButton === false) setActiveButton(true);
    if (activeButton === true) setActiveButton(false);
  }

  return (
    <div className="top-bar">
      <header className="header">
        <button
          className="buttonHamburguer"
          type="button"
          data-testid="top-hamburguer"
          onClick={ handleActive }
        >
          <GoThreeBars size={ 40 } />
        </button>
        <h1 className="title" data-testid="top-title">{title || 'TryBeer'}</h1>
      </header>
      { activeButton === true ? <SideBarClient /> : null }
    </div>
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopBar;
