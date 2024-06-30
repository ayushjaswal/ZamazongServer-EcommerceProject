import { model, Schema } from "mongoose";
const userSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    profile: { type: String, required: true },
  },
  { timestamps: true }
);

const user = model("user", userSchema);

export default user;
