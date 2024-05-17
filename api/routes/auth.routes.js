const express = require("express");
const multer = require("multer");
const router = express.Router();
const { login } = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/auth");

router.post("/login", login);

module.exports = router;
