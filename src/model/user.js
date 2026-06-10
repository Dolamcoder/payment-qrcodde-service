const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{9,11}$/, "Invalid phone number"],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);
module.exports = mongoose.model("User", userSchema);
