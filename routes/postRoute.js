const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.route("/").post(postController.createPost);
router.route("/").get(postController.getAllPost);
router.route("/:slug").get(postController.getPost);
router.route("/:slug").delete(postController.deletePost);
router.route("/:slug").put(postController.updatePost);

module.exports = router;
