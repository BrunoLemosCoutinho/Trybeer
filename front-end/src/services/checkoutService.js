import { saveSale } from './api';

export function removeCheckoutItem(name, cart, setCart) {
  console.log('Remove item do carrinho');
  const newCart = cart.filter((item) => item.name !== name);
  console.log('Novo carrinho:', newCart);
  setCart(newCart);
}

function clearCart(setCart) {
  setCart([]);
}

function redirectCart(history, setCart) {
  const timeOut = 5000;

  setTimeout(() => {
    clearCart(setCart);

    history.push('/products');
  }, timeOut);
}

export async function checkoutOrder(history, setCart, sale) {
  await saveSale(sale);

  const cartItens = document.getElementById('cart-checkout');
  const parentDiv = cartItens.parentNode;
  const sentOrderMessage = document.createElement('span');
  const orderMessage = document.createTextNode('Compra realizada com sucesso!');
  sentOrderMessage.appendChild(orderMessage);

  parentDiv.replaceChild(sentOrderMessage, cartItens);
  localStorage.setItem('cart', []);
  redirectCart(history, setCart);
}
