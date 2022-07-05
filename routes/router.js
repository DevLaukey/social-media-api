const express = require("express");
const { signUp, login } = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.post("/register", signUp);
router.post("/login", login);

module.exports = router;
