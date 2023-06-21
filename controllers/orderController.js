const Order = require("../models/orderModel");
const Product = require("../models/ProductModel");

const orderCtrl = {
  createOrder: async (req, res) => {
    try {
      const { items } = req.body;
  
      if (!items || items.length === 0) {
        return res.status(400).json({
          code: 400,
          description: "Items are missing",
          success: false,
        });
      }
  
      const order = new Order({
        items,
        status: "pending",
      });
  
      await order.save();
  
      // Populate the 'items' field with product details
      const populatedOrder = await Order.populate(order, "items");
  
      return res.status(200).json({
        code: 200,
        description: "Order created successfully",
        success: true,
        data: populatedOrder,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  fetchOrder: async (req, res) => {
    try {
      const orders = await Order.find().populate("items");
      if (orders.length > 0) {
        const updatedOrders = orders.map((order) => ({
          ...order._doc,
          totalPrice: order.totalPrice,
        }));
        res.status(200).json({
          code: 200,
          description: "Orders retrieved successfully",
          data: updatedOrders,
          success: true,
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "No orders found",
          success: false,
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
  getPendingOrders: async (req, res) => {
    try {
      const pendingOrders = await Order.find({ status: "pending" });
      res.json(pendingOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateOrderStatus: async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({
        status: order.status,
        totalPrice: order.totalPrice,
        items: order.items,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;

      const order = await Order.findByIdAndDelete(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({
        code: 200,
        description: "Order deleted successfully",
        success: true,
        data: order,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = orderCtrl;
