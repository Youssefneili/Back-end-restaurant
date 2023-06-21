const router = require ("express").Router();
const upload = require("../middleware/multerConfig");
const productCtrl = require('../controllers/productController');

router.post('/addProduct', upload.single('image'), productCtrl.addProduct);
router.get('/fetchProduct', productCtrl.fetchProduct);


module.exports = router;