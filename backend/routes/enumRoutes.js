const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const {
	createEnum,
	getAllEnums,
	editNamesByEnumId,
	deleteEnumById,
} = require("../controllers/Misc/enumController.js");

router
	.route("/")
	.post([protect, superAdmin], createEnum)
	.get([protect, admin], getAllEnums);
router
	.route("/:enumId")
	.put([protect, superAdmin], editNamesByEnumId)
	.delete([protect, superAdmin], deleteEnumById);

module.exports = router;
