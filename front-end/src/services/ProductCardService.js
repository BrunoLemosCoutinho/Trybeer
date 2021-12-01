// ProductCard Services - fix cypress requisito 5

export const localStorageCart = JSON.parse(localStorage.getItem('cart'));

export function decreaseQuantity(quantity, setQuantity) {
  if (quantity === 0) return;
  setQuantity(quantity - 1);
}

export function increaseQuantity(quantity, setQuantity) {
  setQuantity(quantity + 1);
}
