const express = require("express");
const { signUp, login } = require("../controllers/userController");
const {
  addPost,
  viewPosts,
  addComment,
  addReply,
} = require("../controllers/postController");

const { authorize } = require("../middlewares/auth");
const router = express.Router();


// users
router.post("/register", signUp);
router.post("/login", login);
// posts
router.get("/", viewPosts);
router.post("/add-posts", authorize, addPost);
router.post("/add-comments/:id", authorize, addComment);

router.post("/post/comments/reply/", authorize, addReply);

module.exports = router;
