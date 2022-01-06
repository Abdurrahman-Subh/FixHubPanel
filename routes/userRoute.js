const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleWares/authMiddleware");

const router = express.Router();

router.route("/register").post(authController.createUser); // http://localhost:3000/users/register
router.route("/login").post(authController.loginUser); // http://localhost:3000/users/login
router.route("/logout").get(authController.logoutUser);

module.exports = router;
