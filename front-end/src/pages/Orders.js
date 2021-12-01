import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import OrdersCard from '../components/Orders/OrdersCard';
import TrybeerContext from '../context/TrybeerContext';
import TopBar from '../components/SideBarClient/TopBar';
import getOrders from '../services/ClientOrderService';

import './Orders.css';

function Orders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const { orders, setOrders } = useContext(TrybeerContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return history.push('/login');

    getOrders(user.email).then((result) => {
      setOrders(result);

      setLoading(false);
    });
  }, []);

  function redirectDetails(id) {
    history.push(`/orders/${id}`);
  }

  return (
    loading
      ? <div>loading</div>
      : (
        <div>
          <TopBar title="Meus Pedidos" />
          { orders.map((order, index) => (
            <div key={ index }>
              <button
                className="divPedidos"
                type="button"
                onClick={ () => redirectDetails(order.id) }
              >
                <OrdersCard
                  index={ index }
                  id={ order.id }
                  date={ order.createdAt }
                  total={ order.totalPrice }
                  status={ order.status }
                />
              </button>
            </div>
          ))}
        </div>
      )
  );
}

export default Orders;
