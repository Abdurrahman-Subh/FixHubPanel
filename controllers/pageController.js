const Post = require("../models/Posts");
const nodemailer = require("nodemailer");
const Slider = require("../models/Slider");

exports.getHomePage = async (req, res) => {
  const sliders = await Slider.find();
  res.status(200).render("index", {
    sliders,
    page_name: "index",
  });
};

exports.getServicePage = (req, res) => {
  res.status(200).render("service", {
    page_name: "service",
  });
};

exports.getSellPage = (req, res) => {
  res.status(200).render("sell", {
    page_name: "sell",
  });
};

exports.getDataPage = (req, res) => {
  res.status(200).render("data", {
    page_name: "data",
  });
};

exports.getDealsPage = (req, res) => {
  res.status(200).render("deals", {
    page_name: "deals",
  });
};

exports.getBlogPage = (req, res) => {
  res.status(200).render("posts", {
    page_name: "posts",
  });
};

exports.getSlidersPage = (req, res) => {
  res.status(200).render("sliders", {
    page_name: "sliders",
  });
};

exports.getAddPage = (req, res) => {
  res.render("add");
};

exports.getAddSliderPage = (req, res) => {
  res.render("addSlider");
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.sendEmail = async (req, res) => {
  const outputMessage = `
    <h1>Mail Details </h1>
    <ul>
      <li>Name: ${req.body.name} </li>
      <li>Phone Number: ${req.body.number} </li>
      <li>Address: ${req.body.address} </li>
      <li>Device: ${req.body.device} </li>
      <li>Model: ${req.body.model} </li>
      <li>Problem: ${req.body.problem} </li>
    </ul>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,

    secure: true, // true for 465, false for other ports
    auth: {
      user: "omer.subohh@gmail.com", // gmail account
      pass: "a200120021972aa", // gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Phone Problem Form 👻" <omer.subohh@gmail.com>', // sender address
    to: "omer.subohh@gmail.com", // list of receivers
    subject: "Phone Problem Form New Message", // Subject line
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.status(200).redirect("/");
};
exports.sendEmailNews = async (req, res) => {
  const outputMessage = `
    <h1>Mail Details </h1>
    <ul>
      <li>Email: ${req.body.news} </li>
    </ul>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,

    secure: true, // true for 465, false for other ports
    auth: {
      user: "omer.subohh@gmail.com", // gmail account
      pass: "a200120021972aa", // gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"NewsLetter 👻" <omer.subohh@gmail.com>', // sender address
    to: "omer.subohh@gmail.com", // list of receivers
    subject: "NewsLetter New Subscriber", // Subject line
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.status(200).redirect("/");
};
