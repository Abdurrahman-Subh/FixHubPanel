const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect("/");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect("/");
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getAddPage = (req, res) => {
  res.status(200).render("add", {
    page_name: "add",
  });
};
exports.getAddSliderPage = (req, res) => {
  res.status(200).render("addSlider", {
    page_name: "addSlider",
  });
};

// exports.loginUser = (req, res) => {
//   try {
//     const { username, password } = req.body;
//     User.findOne({ username }, (err, user) => {
//       if (user) {
//         bcrypt.compare(password, user.password, (err, same) => {
//           if (same) {
//             //USER SESSION
//             req.session.userID = user._id;
//             res.status(200).redirect("/users/dashboard");
//           }
//         });
//       }
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       error,
//     });
//   }
// };

// exports.logoutUser = (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/");
//   });
// };

// exports.getDashPage = async (req, res) => {
//   const user = await User.findOne({ _id: req.session.userID });
//   const categories = await Category.find();
//   res.status(200).render("dashboard", {
//     page_name: "dashboard",
//     user,
//     categories,
//   });
// };
