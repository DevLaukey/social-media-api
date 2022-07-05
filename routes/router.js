const express = require("express");
const { signUp, login } = require("../controllers/userController");
const {
  addPost,
  viewPosts,
  addComment,
    viewComments,
  addReply
} = require("../controllers/postController");


const router = express.Router();

router.get("/", viewPosts);

router.post("/register", signUp);
router.post("/login", login);

router.post("/add-comments/:id", addComment);
router.get("/post/comments/:postID", viewComments);
router.post("/add-posts", addPost);
router.post("/post/comments/reply/:postID", addReply)

module.exports = router;
