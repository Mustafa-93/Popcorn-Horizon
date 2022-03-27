const crypto = require("crypto");
const encrypt = (password) => {
  return (
      crypto
        .createHmac("sha256", "Ciro Immobile")
        .update(password) 
        .digest("hex") 
  );
};
module.exports = encrypt;