import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GoTrashcan } from 'react-icons/go';
import { removeCheckoutItem } from '../../services/checkoutService';
import TrybeerContext from '../../context/TrybeerContext';

import './CheckoutItem.css';

function CheckoutItem({ name, price, quantity, index }) {
  const { cart, setCart } = useContext(TrybeerContext);
  const totalPrice = parseFloat(price) * Number(quantity);

  return (
    <div className="divMain">
      <div className="divCartItem">
        <p data-testid={ `${index}-product-qtd-input` }>
          {`${quantity}`}
        </p>
        <div data-testid={ `${index}-product-name` }>
          { name }
        </div>
        <div data-testid={ `${index}-product-total-value` }>
          {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
        </div>
        <div data-testid={ `${index}-product-unit-price` }>
          { `(R$ ${price.replace('.', ',')} un)` }
        </div>
        <button
          className="buttonRemoveItem"
          type="button"
          data-testid={ `${index}-removal-button` }
          onClick={ () => removeCheckoutItem(name, cart, setCart) }
        >
          <GoTrashcan size={ 20 } />
        </button>
      </div>
    </div>
  );
}

CheckoutItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default CheckoutItem;
