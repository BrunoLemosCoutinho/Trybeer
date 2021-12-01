import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';

import './Login.css';

const {
  userValidation, redirectPath, handleUserNotRegistered,
} = require('../services/loginService');

function Login() {
  const { user, setUser } = useContext(TrybeerContext);
  const [enableButton, setEnableButton] = useState(true);
  const history = useHistory();
  localStorage.clear();

  return (
    <form>
      <div className="divLogin">
        <label htmlFor="email-input">
          Email
          <br />
          <input
            className="inputLogin"
            id="email-input"
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ () => userValidation(user, setUser, setEnableButton) }
          />
        </label>
      </div>
      <div className="divLogin">
        <label htmlFor="password-input">
          Senha
          <br />
          <input
            className="inputLogin"
            id="password-input"
            type="password"
            data-testid="password-input"
            onChange={ () => userValidation(user, setUser, setEnableButton) }
          />
        </label>
      </div>
      <div>
        <button
          className="buttonLogin"
          disabled={ enableButton }
          type="button"
          data-testid="signin-btn"
          onClick={ () => redirectPath(history, user) }
        >
          Entrar
        </button>
        <button
          className="buttonLogin"
          type="button"
          data-testid="no-account-btn"
          onClick={ () => handleUserNotRegistered(history) }
        >
          Ainda não tenho conta
        </button>
      </div>
    </form>
  );
}

export default Login;
