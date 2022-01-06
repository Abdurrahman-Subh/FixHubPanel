const express = require("express");
const sliderController = require("../controllers/sliderController");

const router = express.Router();

router.route("/").post(sliderController.createSlider);
router.route("/").get(sliderController.getAllSlider);
router.route("/:slug").get(sliderController.getSlider);
router.route("/:slug").delete(sliderController.deleteSlider);
router.route("/:slug").put(sliderController.updateSlider);

module.exports = router;
