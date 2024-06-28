import mongoose from "mongoose";

const { Schema } = mongoose;

const userschema = new Schema({
  userName: {
    type: String,
    required: true, // Note: use 'required' instead of 'require'
    index: true,
  },
  userEmail: {
    type: String,
    required: true, // Note: use 'required' instead of 'require'
    index: true,
  },
  userImg: {
    type: String,
    required: true, // Note: use 'required' instead of 'require'
    index: true,
  },
});

// Check if the model is already compiled to prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userschema);

export default User;
