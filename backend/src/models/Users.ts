import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String },
  email: { type: String },
  profilePhoto: { type: String },
});

export default mongoose.model("User", UserSchema);
