import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllSales } from '../services/api';
import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';

import './Admin.css';

function AdminOrders() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getAllSales().then((salesAPI) => {
      setSales(salesAPI);

      setLoading(false);
    });
  }, []);

  function redirectDetails(id) {
    history.push(`/admin/orders/${id}`);
  }

  return (
    loading
      ? <div>loading</div>
      : (
        <div className="div-main">
          <SideBarAdmin />
          <div className="div-filha">
            <h1 className="title">Admin Orders</h1>
            {sales.map((sale, index) => (
              <div key={ index }>
                <button
                  className="buttonPedidos"
                  type="button"
                  onClick={ () => redirectDetails(sale.id) }
                >
                  <h2 data-testid={ `${index}-order-number` }>
                    {`Pedido ${sale.id}`}
                  </h2>
                  <h3 data-testid={ `${index}-order-status` }>
                    {sale.status}
                  </h3>
                  <p data-testid={ `${index}-order-address` }>
                    {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
                  </p>
                  <h3 data-testid={ `${index}-order-total-value` }>
                    {`R$ ${sale.totalPrice.replace('.', ',')}`}
                  </h3>
                </button>
              </div>
            ))}
          </div>
        </div>
      )
  );
}

export default AdminOrders;
