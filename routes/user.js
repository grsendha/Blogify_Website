const { Router } = require("express");
const router = Router();
const User = require("../models/user");

/* ------------------------------- Get Method ------------------------------- */

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

/* -------------------------------------------------------------------------- */

/* ------------------------------- Post Method ------------------------------ */

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(fullName, email, password);

    await User.create({
      fullName,
      email,
      password,
    });

    console.log("User created successfully");
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

/* -------------------------------------------------------------------------- */

module.exports = router;
