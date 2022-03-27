const checkPassword = (password) => {
  const passwordToCompare = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#£¤$&?^*])(?=.{8,})"
  );
  if (password.match(passwordToCompare)) {
    return true;
  } else {
    return false;
  }
};
const checkEmail = (email) => {
  const emailToCompare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailToCompare.test(email);
};
module.exports = { checkEmail, checkPassword };
