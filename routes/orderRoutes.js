const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');

router.post('/createOrder', orderCtrl.createOrder);
router.get('/', orderCtrl.getPendingOrders);
router.get('/fetchOrder', orderCtrl.fetchOrder);
router.delete('/:orderId', orderCtrl.deleteOrder);
router.put('/:orderId', orderCtrl.updateOrderStatus);

module.exports = router;