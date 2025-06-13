import mongoose from "mongoose";
import { ChatCompletionMessage } from "openai/resources/chat/completions";

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      role: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat; 