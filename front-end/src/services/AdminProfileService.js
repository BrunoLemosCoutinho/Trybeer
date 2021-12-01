export default function getLocal({
  setNameLocal,
  setEmailLocal,
  setExistsLocal,
  history,
}) {
  let userLocalStorage;
  if (localStorage.getItem('user')) {
    userLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userLocalStorage.role === 'administrator') {
      setNameLocal(userLocalStorage.name);
      setEmailLocal(userLocalStorage.email);
      return setExistsLocal(true);
    }
    history.push('/');
  }
  history.push('/');
}
