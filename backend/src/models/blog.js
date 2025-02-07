import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    content: { type: String, required: [true, "content is required"] },
    coverImg: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "userId is required"],
    },
  },
  { timeStamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

export default Blog;
