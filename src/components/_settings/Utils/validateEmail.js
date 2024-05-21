/* eslint-disable no-useless-escape */
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function validateEmail(mail = '') {
  if (typeof mail !== 'string') return false;

  if (EMAIL_REGEX.test(mail.trim())) {
    return true;
  }
  return false;
}
