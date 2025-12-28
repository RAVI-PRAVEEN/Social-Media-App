import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    file: {
      type: String,
      default: "",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const chatSchema = mongoose.Schema(
  {
    // chatId = user1Id + user2Id (ordered)
    _id: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chat", chatSchema);
export default Chats;
