const crypto = require("crypto");
const SECRET_KEY =process.env.SECRET_KEY 
const generateSignature = (bookingId, timestamp) => {
  return crypto
    .createHash("sha256")
    .update(bookingId + timestamp + SECRET_KEY)
    .digest("hex");
};
module.exports= {generateSignature};
