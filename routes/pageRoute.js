const express = require("express");

const pageController = require("../controllers/pageController");
const authMiddleware = require("../middleWares/authMiddleware");

const router = express.Router();

router.route("/").get(pageController.getHomePage);
router.route("/service").get(pageController.getServicePage); //Get Service Page
router.route("/sell").get(pageController.getSellPage); //Get Sell Page
router.route("/data").get(pageController.getDataPage); //Get Data Page
router.route("/deals").get(pageController.getDealsPage); //Get Deals Page
router.route("/about").get(pageController.getAboutPage); //Get About Page
router.route("/register").get(pageController.getRegisterPage); //Get Register Page
router.route("/login").get(pageController.getLoginPage); //Get Login Page
router.route("/add").get(authMiddleware, pageController.getAddPage); //Get Add Post Page
router.route("/addSlider").get(authMiddleware, pageController.getAddSliderPage); //Get Add Slider Page
router.route("/").post(pageController.sendEmail); //Send Email Function
router.route("/news").post(pageController.sendEmailNews); //Send Email Function

module.exports = router;
