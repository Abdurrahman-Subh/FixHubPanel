const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const postController = require("./controllers/postController");
const pageRoute = require("./routes/pageRoute");
const pageController = require("./controllers/pageController");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const sliderRoute = require("./routes/sliderRoute");
const Slider = require("./models/Slider");
const app = express();

//Connect DB
mongoose
  .connect(
    "mongodb+srv://fixhub:1357913579a@cluster0.p8oq1.mongodb.net/fixhub?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch((err) => {
    console.log(err);
  });

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//Global Variable

global.userIN = null;

//MIDDLEWARES

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://fixhub:1357913579a@cluster0.p8oq1.mongodb.net/fixhub?retryWrites=true&w=majority",
    }),
  })
);

app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
// app.use("/", async (req, res) => {
//   const sliders = await Slider.find();
//   res.render("index", {
//     sliders,
//   });
// }); //Get Home Page
app.use("/", pageRoute);
// app.use("/sliders", sliderRoute); //Get Home Page
app.use("/posts", postRoute); //Get posts Page
app.use("/sliders", sliderRoute); //Get posts Page
app.use("/users", userRoute); //Create User Page

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
