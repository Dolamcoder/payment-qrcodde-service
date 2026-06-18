const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
dotenv.config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", require("./src/router/paymenRouter"));
app.use("/api", require("./src/router/qrRoute"));
app.get("/", (req, res) => {
  res.send("Hello from Node.js server!");
});
app.use("/api", require("./src/router/chatRouter"));
const port = 3000;
connectDB();
app.use("/api/users", require("./src/router/userRoute"));
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
