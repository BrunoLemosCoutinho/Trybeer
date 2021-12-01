import { updateUser } from './api';

export function getLocal({
  setEditedName,
  setNameLocal,
  setEmailLocal,
  setExistsLocal,
  history,
}) {
  let userLocalStorage;
  if (localStorage.getItem('user')) {
    userLocalStorage = JSON.parse(localStorage.getItem('user'));
    setEditedName(userLocalStorage.name);
    setNameLocal(userLocalStorage.name);
    setEmailLocal(userLocalStorage.email);
    return setExistsLocal(true);
  }
  history.push('/');
}

export async function sendNewName(editedName, emailLocal) {
  await updateUser(editedName, emailLocal);
  const textSpan = document.createElement('span');
  textSpan.innerHTML = 'Atualização concluída com sucesso';
  document.getElementById('div-profile').appendChild(textSpan);
}
