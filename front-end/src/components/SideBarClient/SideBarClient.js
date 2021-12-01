import React from 'react';
import { Link } from 'react-router-dom';

import './SideBarClient.css';

function SideBarClient() {
  function clearLocalStorage() {
    localStorage.clear();
  }

  return (
    <div className="side-menu-container">
      <Link to="/products">
        <button className="botao" data-testid="side-menu-item-products" type="button">
          Produtos
        </button>
      </Link>

      <Link to="/orders">
        <button className="botao" data-testid="side-menu-item-my-orders" type="button">
          Meus Pedidos
        </button>
      </Link>

      <Link to="/profile">
        <button className="botao" data-testid="side-menu-item-my-profile" type="button">
          Meu Perfil
        </button>
      </Link>

      <Link to="/chat">
        <button className="botao" data-testid="side-menu-chat" type="button">
          Conversar com a loja
        </button>
      </Link>

      <Link to="/">
        <button
          className="botao"
          data-testid="side-menu-item-logout"
          type="button"
          onClick={ clearLocalStorage }
        >
          Sair
        </button>
      </Link>
    </div>
  );
}

export default SideBarClient;
