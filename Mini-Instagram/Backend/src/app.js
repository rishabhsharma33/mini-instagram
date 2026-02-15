const express = require("express");
const multer = require("multer");
const postModel = require("./models/post.model");
const { uploadImage } = require("./services/storage.service");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/create-post", upload.single("image"), async (req, res) => {
  const result = await uploadImage(req.file.buffer);

  const { caption } = req.body;

  try {
    const newPost = await postModel.create({ caption, image: result });
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
