import User from "../models/User.js";
import Chat from "../models/Chat.js";
import OpenAI from "openai";
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from "@google/generative-ai";
export const generateChatCompletion = async (req, res, next) => {
    const { message, chatId } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        let chat;
        if (chatId && mongoose.Types.ObjectId.isValid(chatId)) {
            chat = await Chat.findOne({ _id: chatId, user: user._id });
            if (!chat) {
                // If chat not found with valid ID, it might have been deleted or doesn't belong to user
                // In this case, treat it as a new chat
                chat = new Chat({ user: user._id, messages: [] });
                await chat.save();
            }
        }
        else {
            // If no chatId or invalid chatId, create a new chat
            chat = new Chat({ user: user._id, messages: [] });
            await chat.save();
        }
        const chats = chat.messages.map(({ role, content }) => ({
            role,
            content,
        }));
        // Limit the number of messages sent to OpenAI to the last 10 messages for performance
        const limitedChats = chats.slice(Math.max(0, chats.length - 10));
        limitedChats.push({ content: message, role: "user" });
        chat.messages.push({ content: message, role: "user" });
        let chatResponse;
        try {
            // Attempt to use Google Gemini (primary)
            console.log("Attempting Google Gemini...");
            const genAI = new GoogleGenerativeAI(process.env.GEMMNI_AI_SECRET);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const geminiMessages = limitedChats.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            }));
            const geminiResult = await model.generateContent({
                contents: geminiMessages,
            });
            chatResponse = {
                choices: [{
                        message: {
                            role: 'assistant',
                            content: geminiResult.response.text(),
                        },
                    }],
            };
            console.log("Google Gemini response received.");
        }
        catch (geminiError) {
            console.error("Google Gemini failed, attempting OpenRouter.ai:", geminiError);
            // Fallback to OpenRouter.ai (secondary)
            const openai = new OpenAI({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: process.env.OPEN_AI_SECRET,
                timeout: 300000, // Set timeout to 5 minutes (300,000 ms)
            });
            console.log("Attempting OpenRouter.ai...");
            chatResponse = await openai.chat.completions.create({
                model: "deepseek/deepseek-chat-v3-0324:free",
                messages: limitedChats,
            });
            console.log("OpenRouter.ai response received.");
        }
        if (!chatResponse || !chatResponse.choices || chatResponse.choices.length === 0) {
            throw new Error("No valid response from AI models");
        }
        chat.messages.push(chatResponse.choices[0].message);
        await chat.save();
        // Determine the chat title: if it's a new chat or the first message, use its content
        const chatTitle = chat.messages.length > 0 && chat.messages[0].role === 'user'
            ? chat.messages[0].content.slice(0, 30) + (chat.messages[0].content.length > 30 ? '...' : '')
            : `Chat ${String(chat._id).substring(0, 5)}...`;
        return res.status(200).json({ chats: chat.messages, chatId: chat._id, title: chatTitle });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        const userChats = await Chat.find({ user: user._id });
        const formattedChats = userChats.map(chat => ({
            id: chat._id,
            messages: chat.messages,
            title: chat.messages.length > 0 && chat.messages[0].role === 'user'
                ? chat.messages[0].content.slice(0, 30) + (chat.messages[0].content.length > 30 ? '...' : '')
                : `Chat ${String(chat._id).substring(0, 5)}...`,
        }));
        return res.status(200).json({ message: "OK", chats: formattedChats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChat = async (req, res, next) => {
    const chatId = req.params.id;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        const chat = await Chat.findOneAndDelete({ _id: chatId, user: user._id });
        if (!chat) {
            return res.status(404).json({ message: "Chat not found or not authorized" });
        }
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        await Chat.deleteMany({ user: user._id });
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map