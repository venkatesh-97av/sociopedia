const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
} = require("../controllers/users.controller");

router.get("/:id", getUser);
router.get("/:id/friends", getUserFriends);
router.put("/:id/:friendId", addRemoveFriend);

module.exports = router;
