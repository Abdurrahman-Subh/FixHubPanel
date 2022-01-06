const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const { marked } = require("marked");

const dompurify = createDomPurify(new JSDOM().window);

//Create Schema
const PostSchema = new Schema({
  title: String,
  desc: String,
  smallDesc: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
  },
});

PostSchema.pre("validate", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  if (this.desc) {
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.desc));
  }
  next();
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
