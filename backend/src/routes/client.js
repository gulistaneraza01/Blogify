import express from "express";
import {
  getBlogs,
  addBlog,
  getBlog,
  addComment,
  getComments,
} from "../controllers/client.js";
import upload from "../utils/uploadImg.js";

const router = express.Router();

router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlog);
router.get("/comments/:blogId", getComments);
router.post("/addblog", upload.single("coverImg"), addBlog);
router.post("/comment/:blogId", addComment);

export default router;
