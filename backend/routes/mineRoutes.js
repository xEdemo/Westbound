const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const { createMine, getAllMines, updateMineById, deleteMineById } = require("../controllers/World/mineController.js");

router.route("/").post([protect, superAdmin], createMine).get([protect], getAllMines);
router.route("/:mineId").put([protect, superAdmin], updateMineById).delete([protect, superAdmin], deleteMineById);

module.exports = router;
