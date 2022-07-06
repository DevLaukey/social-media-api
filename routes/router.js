const express = require("express");
const { signUp, login } = require("../controllers/userController");
const {
  addPost,
  viewPosts,
  addComment,
  viewComments,
  addReply,
} = require("../controllers/postController");

const { authorize } = require("../middlewares/auth");
const router = express.Router();

// posts
router.get("/", viewPosts);
router.post("/add-posts", authorize, addPost);
router.post("/add-comments/:id", authorize, addComment);
router.get("/post/comments/:postID", authorize, viewComments);
router.post("/post/comments/reply/:postID", authorize, addReply);

// users
router.post("/register", signUp);
router.post("/login", login);

module.exports = router;
