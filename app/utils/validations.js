
export const validateEmail = (email) => {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailPattern.test(email)) {
    return true;
  }
  return false;
};

export const validatePassword = (password) => {
  return password === '' || password.length < 6;
};

export const validateName = (name) => {
  const numbers = /[0-9]/;
  if (name.match(numbers)) {
    return false
  }
  return true
}
