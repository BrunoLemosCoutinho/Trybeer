import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function OrdersCard({ index, id, date, total, status }) {
  return (
    <div data-testid={ `${index}-order-card-container` }>
      <h2 data-testid={ `${index}-order-number` }>{`Pedido ${id}`}</h2>
      <h3 data-testid={ `${index}-order-date` }>{moment(date).format('DD/MM')}</h3>
      <h3 data-testid={ `${index}-order-total-value` }>
        { `R$ ${total.replace('.', ',')}` }
      </h3>
      <h3 data-testid={ `${index}-order-status` }>{`${status}`}</h3>
    </div>
  );
}

OrdersCard.propTypes = {
  id: PropTypes.number.isRequired,
  total: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default OrdersCard;
