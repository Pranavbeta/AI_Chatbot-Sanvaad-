import axios from "axios";


// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
      throw new Error("Unable to login");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to sign up a user
export const signupUser = async (name, email, password) => {
  try {
    const res = await axios.post("/user/signup", { name, email, password });
    if (res.status !== 201) {
      throw new Error("Unable to Signup");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to check authentication status
export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to send a chat message
export const sendChatRequest = async (message, chatId) => {
  try {
    const res = await axios.post("/chat/new", { message, chatId });
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to get all user chats
export const getUserChats = async () => {
  try {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 200) {
      throw new Error("Unable to fetch chats");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to delete all user chats
export const deleteAllUserChats = async () => {
  try {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
      throw new Error("Unable to delete chats");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to delete a specific chat
export const deleteChat = async (chatId) => {
  try {
    const res = await axios.delete(`/chat/${chatId}`);
    if (res.status !== 200) {
      throw new Error("Unable to delete chat");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const googleAuth = (code) => axios.get(`/user/google?code=${code}`)

// Function to log out a user
export const logoutUser = async () => {
  try {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to logout");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
