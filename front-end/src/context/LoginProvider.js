import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [address, setAddress] = useState({ rua: '', numero: '' });
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);

  const providerValue = {
    user,
    setUser,
    newUser,
    setNewUser,
    products,
    setProducts,
    cart,
    setCart,
    totalCart,
    setTotalCart,
    address,
    setAddress,
    sales,
    setSales,
    orders,
    setOrders,
  };

  return (
    <TrybeerContext.Provider value={ providerValue }>
      { children }
    </TrybeerContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LoginProvider;
