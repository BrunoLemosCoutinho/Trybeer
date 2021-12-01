import { createNewUSer } from './api';
import { redirectPath } from './loginService';

export function validateNewUser(newUser, setNewUser, setEnableButton) {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const isSeller = document.getElementById('signup-seller').checked;
  const userNamePattern = /^[\sa-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]{12,}$/;
  const emailPattern = /\S+@\S+\.\S+/;
  const minPasswordLength = 6;

  if (
    userNamePattern.test(name)
    && password.length >= minPasswordLength
    && emailPattern.test(email)
  ) {
    setNewUser({
      ...newUser,
      name,
      password,
      email,
      role: isSeller ? 'administrator' : 'client',
    });

    return setEnableButton(false);
  }

  setEnableButton(true);
}

export async function registerNewUSer(history, user, registered) {
  const createdUser = await createNewUSer(user);

  if (createdUser.message === 'User Created') {
    registered(false);
    await redirectPath(history, user);
  }
  registered(true);
}
