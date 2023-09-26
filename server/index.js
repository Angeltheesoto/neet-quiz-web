const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/db");
const apiRouter = require("./routes/apiRoutes");

require("dotenv").config();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log("Server is running.");
});
