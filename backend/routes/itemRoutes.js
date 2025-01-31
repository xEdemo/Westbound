const multer = require("multer");
const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const {
	createItem,
	getAllItems,
	deleteItem,
} = require("../controllers/itemController.js");

// Configure Multer (store image in memory first)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router
	.route("/")
	.post([protect, superAdmin, upload.single("image")], createItem)
	.get([protect], getAllItems);
router.route("/:itemId").delete([protect, superAdmin], deleteItem);

module.exports = router;
