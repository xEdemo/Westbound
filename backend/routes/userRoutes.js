const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const {
	registerUser,
	getAllUsernames,
	getAllEmails,
	getUser,
	authUser,
	logoutUser,
	deleteUser,
	addXpToUser,
} = require("../controllers/userController.js");

router.route("/usernames").get(getAllUsernames);
router.route("/emails").get(getAllEmails);

router.route("/").post(registerUser).get([protect], getUser).put([protect, superAdmin], addXpToUser);
router.route("/auth").post(authUser);
router.route("/logout").post([protect], logoutUser);
router.route("/:userId").delete([protect, superAdmin], deleteUser);

module.exports = router;
