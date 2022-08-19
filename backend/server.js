const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare");
require("dotenv").config();
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB);

app.use("/api/users", userRoutes);

app.use(notFound, errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
