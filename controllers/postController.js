const Post = require("../models/Posts");
const fs = require("fs");

exports.createPost = async (req, res) => {
  const uploadDir = "public/uploads";
  try {
    // const post = Post.create(req.body);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + "/../public/uploads/" + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
      await Post.create({
        ...req.body,
        image: "/uploads/" + uploadeImage.name,
      });
      res.status(201).redirect("/posts");
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).render("posts", {
      posts,
      page_name: "posts",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    res.status(200).render("post", {
      post,
      page_name: "posts",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    // req ile gelenr resim bulundu
    const post = await Post.findOneAndRemove({ slug: req.params.slug });
    // localde resmin yolu bulundu
    let deletedImage = __dirname + "/../public" + post.image;
    // image localde silindi
    fs.unlinkSync(deletedImage);
    // yapı db den silindi
    // await Post.findByIdAndRemove(req.params.id);
    // anasayfaya yönlendirdi
    res.redirect("/posts");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    post.title = req.body.title;
    post.desc = req.body.desc;
    post.smallDesc = req.body.smallDesc;
    post.save();
    res.status(200).redirect("/posts");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
