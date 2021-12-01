import React from 'react';
import PropTypes from 'prop-types';

import '../../pages/UserRegister.css';

function Input({ title, id, type, callback }) {
  console.log(id, type, callback);
  return (
    <label htmlFor={ id }>
      { title }
      <br />
      <input
        className="inputRegister"
        id={ id }
        type={ type }
        data-testid={ id }
        onChange={ callback }
      />
    </label>
  );
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default Input;
