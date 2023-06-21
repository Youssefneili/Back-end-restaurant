const router = require("express").Router();
const upload = require("../middleware/multerConfig");
const articleCtrl = require("../controllers/articleController");

router.post("/addArticle", upload.single('image'), articleCtrl.addArticle);
router.get("/fetchArticle", articleCtrl.fetchArticle);
router.delete("/deleteArticle/:id", articleCtrl.deleteArticle);
router.put("/updateArticle/:id", articleCtrl.updateArticle);

module.exports = router;
