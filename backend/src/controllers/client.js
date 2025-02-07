import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

//getBlogs
const getBlogs = async (req, res) => {
  const { pageno, limit } = req.query;
  const userId = req.userId;
  const query = Blog.find();
  try {
    const doc = await query
      .sort({ userId: -1 })
      .skip((Number(pageno) - 1) * limit)
      .limit(limit)
      .exec();
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ status: "Empty blogs", data: { error } });
  }
};

//getBlog
const getBlog = async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const query = Blog.findById(id).populate("userId");
  try {
    const doc = await query.exec();
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//addBlog
const addBlog = async (req, res) => {
  const path = req?.file?.path;
  const userId = req.userId;
  const { title, content } = req.body;
  const newBlog = new Blog({ title, content, coverImg: path, userId });
  try {
    const doc = await newBlog.save();
    res.status(201).json({ status: "success", data: doc });
  } catch (error) {
    res.status(400).json({ status: "failure", data: error });
  }
};

//getComments
const getComments = async (req, res) => {
  const { blogId } = req.params;
  const query = Comment.find({ blogId }).populate("userId").populate("blogId");
  try {
    const doc = await query.exec();
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//addComment
const addComment = async (req, res) => {
  const { blogId } = req.params;
  const userId = req.userId;
  const { content } = req.body;
  const newComment = new Comment({ content, userId, blogId });
  try {
    const doc = await newComment.save();
    res.status(201).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { getBlogs, getBlog, addBlog, addComment, getComments };
