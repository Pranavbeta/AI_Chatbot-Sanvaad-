import mongoose from "mongoose";
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
//# sourceMappingURL=Chat.js.map