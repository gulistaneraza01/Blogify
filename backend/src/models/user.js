import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "username is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    profileImageUrl: {
      type: String,
      default: "./src/public/images/default.jpg",
    },
  },
  { timeStamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
