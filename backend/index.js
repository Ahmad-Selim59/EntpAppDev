const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./src/config/dbConnect");
const productRoutes = require("./src/routes/productRoutes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);
connectDB();

app.use("/api/products", productRoutes);

// Listen Application
mongoose.connection.once("open", () => {
  console.log(
    "MongoDB connected successfully on port num : " + mongoose.connection.port
  );
  app.listen(PORT, () => console.log(`Server running on port num : ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error : " + err);
});
