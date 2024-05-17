const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
// configurations
dotenv.config();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
// middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const { register } = require("../api/controllers/auth.controller");
const authRoutes = require("../api/routes/auth.routes");
const userRoutes = require("../api/routes/user.routes");

const { createPost } = require("../api/controllers/post.controller");
const verifyToken = require("../api/middlewares/auth");

const User = require("./models/userModel");
const Post = require("./models/postModel");
const { users, posts } = require("../api/data/index");
const PORT = process.env.PORT || 3000;

// app.post("/auth/register", upload.single("picture", register));
app.get("/", (req, res) => {
  res.send("Welcome");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.post("/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => console.log(err.message));
app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
