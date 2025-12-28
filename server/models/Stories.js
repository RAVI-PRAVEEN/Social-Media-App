import mongoose from "mongoose";

const storySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userPic: {
      type: String,
      default: "",
    },
    fileType: {
      type: String,
      default: "",
    },
    file: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Stories = mongoose.model("Story", storySchema);
export default Stories;
