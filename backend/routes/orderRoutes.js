// Example route for creating an order
const express = require('express');
const Order = require('./../models/orderModel'); 
const router = express.Router();

router.post('/create-order', async (req, res) => {
  const { items, totalAmount, address, userId } = req.body;

  const newOrder = new Order({
    items: items.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    })),
    totalAmount,
    address,
    userId,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user-orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
