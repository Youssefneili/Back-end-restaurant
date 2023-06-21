const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "denied", "on the way", "delivered"],
    default: "pending",
  },
});

orderSchema.pre("save", async function (next) {
  const Order = mongoose.model("Order");
  const products = await Order.populate(this, "items");
  const totalPrice = products.items.reduce((total, product) => total + product.price, 0);
  this.totalPrice = totalPrice;
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
