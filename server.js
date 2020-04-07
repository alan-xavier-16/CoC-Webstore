const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const connectDB = require("./config/db");
const paypalConfig = require("./config/paypal");
const errorResponse = require("./middleware/errorResponse.middleware");

dotenv.config({ path: "./config/config.env" }); //** Env Variables */
connectDB(); /** Connect to DB */
paypalConfig(); /** Paypal Config */

/** Get Route Files */
const categories = require("./routes/category.routes");
const products = require("./routes/product.routes");
const auth = require("./routes/auth.routes");
const users = require("./routes/user.routes");
const cartItems = require("./routes/cartItem.routes");
const orders = require("./routes/order.routes");
const orderItems = require("./routes/orderItem.routes");

const app = express(); /** Instantiate Express */
app.use(express.json()); /** Body Parser for Requests */

/** Development Logs */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File Upload Middleware
app.use(fileupload());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

/** Mount Routes */
app.use("/api/v1/categories", categories);
app.use("/api/v1/products", products);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/cart", cartItems);
app.use("/api/v1/orders", orders);
app.use("/api/v1/orderitems", orderItems);

// Error Response Middleware
app.use(errorResponse);

/** Server Config */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Express server: Running in ${process.env.NODE_ENV} mode @ port ${process.env.PORT}`
  );
});

/** CLose DB for Unhandled Promise Rejections */
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`);
  // Close Server and Exit Process
  server.close(() => process.exit(1));
});
