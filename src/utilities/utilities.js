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
const checkTicketType = (tickettype) => {
  switch (tickettype) {
    case `adult`: {
      return "Adult";
    }
    case `senior`: {
      return "Pensioner";
    }
    case `child`: {
      return "Barn";
    }
    default: {
      break;
    }
  }
};
const checkEmail = (email) => {
  const emailToCompare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailToCompare.test(email);
};
function debounce(func, timeout) {
  let timer;
  return (arg) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(arg), timeout);
  };
}
module.exports = { checkPassword, checkEmail, checkTicketType, debounce };
