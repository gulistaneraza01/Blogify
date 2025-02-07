import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "conrtent is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
