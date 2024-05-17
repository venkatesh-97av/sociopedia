const express = require("express");

const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../api/controllers/post.controller");
const verifyToken = require("../api/middlewares/auth");

// read
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

// update
router.put('/:id/like', verifyToken, likePost);

module.exports = router;


const router = express.Router();
