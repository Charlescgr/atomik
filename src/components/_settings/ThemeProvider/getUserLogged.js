import isBrowser from '@charlescgr/underline/dist/isBrowser';

export function getUserLogged() {
  let varReturn = '';
  if (isBrowser()) {
    if (localStorage.getItem('userLogged')) {
      varReturn = JSON.parse(localStorage.getItem('userLogged'));
    } else {
      localStorage.setItem('userLogged', false);
      varReturn = false;
    }
  }
  return varReturn;
}
