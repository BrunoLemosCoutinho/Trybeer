import React, { useContext } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
import handleAddressInput from '../../services/addressService';

import './Address.css';

function Address() {
  const { address, setAddress } = useContext(TrybeerContext);
  return (
    <form>
      <fieldset>
        <legend>Endereço</legend>
        <label htmlFor="checkout-street-input">
          Rua
          <br />
          <input
            className="inputAddress"
            id="rua"
            data-testid="checkout-street-input"
            type="text"
            onChange={ () => handleAddressInput(address, setAddress) }
          />
        </label>
        <br />
        <label htmlFor="checkout-house-number-input">
          Número da casa
          <br />
          <input
            className="inputAddress"
            id="numero"
            data-testid="checkout-house-number-input"
            type="text"
            onChange={ () => handleAddressInput(address, setAddress) }
          />
        </label>
      </fieldset>
    </form>
  );
}

export default Address;
