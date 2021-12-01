import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import CheckoutItem from '../components/Checkout/CheckoutItem';
import Address from '../components/Checkout/Address';
import TrybeerContext from '../context/TrybeerContext';
import TopBar from '../components/SideBarClient/TopBar';
import { checkoutOrder } from '../services/checkoutService';

import './Checkout.css';

function Checkout() {
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);
  const {
    cart, setCart, totalCart, setTotalCart, address,
  } = useContext(TrybeerContext);
  const history = useHistory();

  const buttonDisable = address.rua.length && address.numero.length && totalCart > 0;
  const enable = buttonDisable || false;

  let sale;

  if (loggedUser) {
    sale = {
      userEmail: loggedUser.email,
      cart,
      totalPrice: totalCart.toFixed(2).replace('.', ','),
      status: 'Pendente',
      ...address,
    };
  }

  useEffect(() => {
    if (!loggedUser || !loggedUser.token) history.push('/login');

    const localStorageCart = JSON.parse(localStorage.getItem('cart'));

    if (localStorageCart) {
      setCart(localStorageCart);

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let totalValue = 0;

    cart.forEach((cartItem) => {
      totalValue += parseFloat(cartItem.price) * Number(cartItem.quantity);
    });

    setTotalCart(totalValue);

    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    loading
      ? <div>Loading</div>
      : (
        <div>
          <TopBar title="Finalizar Pedido" />
          <div id="cart-checkout">
            {
              !cart.length
                ? <h2>Não há produtos no carrinho</h2>
                : (
                  cart.map((cartItem, index) => (
                    <CheckoutItem
                      key={ index }
                      index={ index }
                      name={ cartItem.name }
                      price={ cartItem.price }
                      quantity={ cartItem.quantity }
                    />
                  ))
                )
            }
            <p data-testid="order-total-value" className="totalPrice">
              {`Total: R$ ${totalCart.toFixed(2).replace('.', ',')}`}
            </p>
            <Address />
            <button
              className="buttonCheckout"
              type="button"
              disabled={ !enable }
              data-testid="checkout-finish-btn"
              onClick={ () => checkoutOrder(history, setCart, sale) }
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      )
  );
}

export default Checkout;
