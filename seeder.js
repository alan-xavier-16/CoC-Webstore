const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" }); //** Env Variables */

/** Load Models for DB */
const Category = require("./models/category.model");
const Product = require("./models/product.model");
const User = require("./models/user.model");
const CartItem = require("./models/cartItem.model");
const Order = require("./models/order.model");

/* Connect to DB */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

/** Read JSON files */
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/category.json`, "utf-8")
);

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const cartItems = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/cartItem.json`, "utf-8")
);

const orders = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/orders.json`, "utf-8")
);

/* Import into DB */
const importData = async () => {
  try {
    await Category.create(categories);
    await Product.create(products);
    await User.create(users);
    await CartItem.create(cartItems);
    await Order.create(orders);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

/* Delete data from DB */
const deleteData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await CartItem.deleteMany();
    await Order.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

/** Command Line Controls -- node seeder -i or -d */
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
