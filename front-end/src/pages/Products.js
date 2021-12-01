import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import ProductCard from '../components/Products/ProductCard';
import Cart from '../components/Products/Cart';
import TopBar from '../components/SideBarClient/TopBar';
import { getAllProducts } from '../services/api';
import TrybeerContext from '../context/TrybeerContext';

import './Products.css';

function Products() {
  const {
    products, setProducts, cart, setCart,
  } = useContext(TrybeerContext);
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (!loggedUser || !loggedUser.token) history.push('/login');

    getAllProducts().then((product) => {
      setProducts(product);
      setLoading(false);
    });

    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    if (localStorageCart) setCart(localStorageCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    loading
      ? <div>Loading</div>
      : (
        <div className="mainDivProducts">
          <TopBar title="TryBeer" />
          <div className="divFilha">
            {products.map((product, index) => {
              const { id, name, price, urlImage } = product;
              return (
                <div className="divCards" key={ index }>
                  <ProductCard
                    key={ id }
                    name={ name }
                    price={ price }
                    urlImage={ urlImage }
                    index={ index }
                  />
                </div>
              );
            })}
          </div>
          <Cart />
        </div>
      )
  );
}

export default Products;
