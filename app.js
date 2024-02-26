require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.Port || 3000;
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

/* -------------------------- Database Connectivity ------------------------- */
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Blogify_backend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));
/* -------------------------------------------------------------------------- */

/* ----------------------------------- Set ---------------------------------- */
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
/* -------------------------------------------------------------------------- */

/* ------------------------------- Middlewares ------------------------------ */
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use("/user", userRoute);
app.use("/blog", blogRoute);
/* -------------------------------------------------------------------------- */

/* -------------------------------- HomePage -------------------------------- */
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});
/* -------------------------------------------------------------------------- */

app.listen(port, () => console.log(`Server listening on port ${port}!`));
