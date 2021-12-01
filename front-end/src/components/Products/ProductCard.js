import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  decreaseQuantity,
  increaseQuantity,
} from '../../services/ProductCardService';
import TrybeerContext from '../../context/TrybeerContext';

import './ProductCard.css';

function ProductCard({ name, price, urlImage, index }) {
  const { cart, setCart } = useContext(TrybeerContext);
  const [quantity, setQuantity] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    cart.forEach((element) => {
      if (element.name === name) setQuantity(element.quantity);
    });
  }, []);

  useEffect(() => {
    if (isMounted) {
      setIsMounted(false);
      return;
    }
    if (quantity === 0) {
      const cartWithoutProduct = cart.filter((element) => element.name !== name);
      setCart(cartWithoutProduct);
      return;
    }

    const preCart = cart.filter((element) => element.name !== name);
    setCart([...preCart, { name, price, quantity }]);
  }, [quantity]);

  return (
    <div className="mainDivProductCard">
      <div className="productCard">
        <p
          className="texto"
          id={ `${index}-product-name` }
          data-testid={ `${index}-product-name` }
        >
          { name }
        </p>
        <p
          className="texto"
          id={ `${index}-product-price` }
          data-testid={ `${index}-product-price` }
        >
          { `R$ ${price.replace('.', ',')}` }
        </p>
        <img
          className="imageCard"
          data-testid={ `${index}-product-img` }
          src={ urlImage }
          alt="product"
        />
        <div className="divBotoesMaisMenos">
          <button
            className="botoesMainMenos"
            type="button"
            id={ `${index}-product-minus` }
            data-testid={ `${index}-product-minus` }
            onClick={ () => decreaseQuantity(quantity, setQuantity) }
          >
            -
          </button>
          <span className="textoMaisMenos" data-testid={ `${index}-product-qtd` }>
            {quantity}
          </span>
          <button
            className="botoesMainMenos"
            type="button"
            id={ `${index}-product-plus` }
            data-testid={ `${index}-product-plus` }
            onClick={ () => increaseQuantity(quantity, setQuantity) }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCard;
