const Slider = require("../models/Slider");
const fs = require("fs");

exports.createSlider = async (req, res) => {
  const uploadDir = "public/sliders";
  try {
    // const post = Post.create(req.body);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + "/../public/sliders/" + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
      await Slider.create({
        ...req.body,
        image: "/sliders/" + uploadeImage.name,
      });
      res.status(201).redirect("/");
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.getAllSlider = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).render("sliders", {
      sliders,
      page_name: "sliders",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getSlider = async (req, res) => {
  try {
    const slider = await Slider.findOne({ slug: req.params.slug });

    res.status(200).render("slider", {
      slider,
      page_name: "sliders",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findOneAndRemove({ slug: req.params.slug });
    let deletedImage = __dirname + "/../public" + slider.image;
    // image localde silindi
    fs.unlinkSync(deletedImage);
    // yapı db den silindi
    // await Post.findByIdAndRemove(req.params.id);
    // anasayfaya yönlendirdi

    //    req.flash("error", `${post.title} has been removed successfully`);

    res.status(200).redirect("/");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findOne({ slug: req.params.slug });
    slider.title = req.body.title;
    slider.desc = req.body.desc;
    slider.save();
    res.status(200).redirect("/sliders");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
