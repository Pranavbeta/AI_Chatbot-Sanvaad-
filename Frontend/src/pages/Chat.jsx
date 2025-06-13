import React, { useState, useEffect } from "react";
import { Avatar, Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery, IconButton } from "@mui/material";
import ChatItem from "../components/chat/ChatItem";
import ChatMain from "../components/chat/ChatMain";
import { getUserChats, deleteChat, deleteAllUserChats } from "../helper/api-communicator";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc"; // Import icons

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#111",
      paper: "#222",
    },
    primary: {
      main: "#00FF41",
    },
  },
});

export default function Chat() {
  const [allConversations, setAllConversations] = useState({}); // Stores all chat histories
  const [currentChatId, setCurrentChatId] = useState(null); // ID of the currently active chat
  const [chatsForSidebar, setChatsForSidebar] = useState([]); // List of chat items for the sidebar
  const isSmallScreen = useMediaQuery(darkTheme.breakpoints.down('md')); // Check if screen is md (900px) or smaller
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isSmallScreen); // State for sidebar visibility, closed by default on small screens

  useEffect(() => {
    console.log(`isSmallScreen: ${isSmallScreen}, isSidebarOpen: ${isSidebarOpen}`); // Debugging log
    const fetchChats = async () => {
      try {
        const data = await getUserChats(); // Fetch chats from backend
        if (data && data.chats) {
          const fetchedConversations = {};
          const fetchedSidebarChats = [];
          // Assuming backend returns chats in a format like [{ id: 'chat-id', messages: [...] }]
          data.chats.forEach(chat => {
            fetchedConversations[chat.id] = { messages: chat.messages, title: chat.title }; // Store both messages and title
            fetchedSidebarChats.push({
              id: chat.id,
              title: chat.title, // Directly use the title from the backend
              desc: chat.messages.slice(-1)[0]?.content?.slice(0, 40) || "Empty chat",
            });
          });
          setAllConversations(fetchedConversations);
          setChatsForSidebar(fetchedSidebarChats);
          if (fetchedSidebarChats.length > 0) {
            setCurrentChatId(fetchedSidebarChats[0].id);
          } else {
            handleNewChat(); // Initialize a new chat if no stored conversations
          }
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        handleNewChat(); // Fallback to new chat on error
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    // Update sidebar chat list when allConversations changes locally
    setChatsForSidebar(Object.keys(allConversations).map(id => {
      const chatTitle = allConversations[id].title; // Get the stored title
      console.log(`Chat ${id}: Stored Title = ${chatTitle}`); // Log the title for debugging
      return {
        id,
        title: chatTitle, // Use the stored title directly
        desc: allConversations[id].messages.slice(-1)[0]?.content?.slice(0, 40) || "Empty chat"
      };
    }));
    // The backend now handles persistence, so no localStorage.setItem here for allConversations
  }, [allConversations]);

  const handleNewChat = async () => {
    // When creating a new chat, we'll rely on sendChatRequest to create it on backend upon first message
    const newChatId = `chat-${Date.now()}`;
    setCurrentChatId(newChatId);
    setAllConversations(prev => ({ ...prev, [newChatId]: { messages: [], title: `Chat ${newChatId.substring(5, 10)}...` } })); // Add placeholder title
    // We don't save to backend immediately here, as sendChatRequest will handle it with the first message
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = async (chatIdToDelete) => {
    // Check if the chat ID is a temporary frontend ID
    if (chatIdToDelete.startsWith("chat-")) {
      setAllConversations(prev => {
        const newConversations = { ...prev };
        delete newConversations[chatIdToDelete];
        return newConversations;
      });

      setChatsForSidebar(prev => prev.filter(chat => chat.id !== chatIdToDelete));

      if (currentChatId === chatIdToDelete) {
        setCurrentChatId(null);
      }
      return; // Exit the function, no API call needed for temporary IDs
    }

    try {
      await deleteChat(chatIdToDelete);
      
      setAllConversations(prev => {
        const newConversations = { ...prev };
        delete newConversations[chatIdToDelete];
        return newConversations;
      });

      setChatsForSidebar(prev => prev.filter(chat => chat.id !== chatIdToDelete));

      if (currentChatId === chatIdToDelete) {
        // If the deleted chat was the active one, clear the active chat
        setCurrentChatId(null);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleDeleteAllChats = async () => {
    try {
      await deleteAllUserChats();
      setAllConversations({});
      setChatsForSidebar([]);
      setCurrentChatId(null);
    } catch (error) {
      console.error("Error deleting all chats:", error);
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexWrap: "nowrap", // Prevent wrapping of ChatItem and ChatMain
          background: "radial-gradient(ellipse at 70% 30%, #003300 0%, #111 80%)",
          width: "100vw", // Ensure full viewport width
          overflowX: "hidden", // Prevent horizontal scroll
          position: "relative", // Ensure absolute positioning of children works correctly
          p: { xs: 0, sm: 2, md: 2 }, // Responsive padding for the main chat container
          boxSizing: 'border-box', // Include padding in the element's total width and height
        }}
      >
        {isSmallScreen && !isSidebarOpen && (
          <IconButton
            onClick={handleSidebarToggle}
            sx={{
              position: "absolute",
              top: 10,
              left: 10, // Position on the left for opening
              color: "#888",
              zIndex: 1000, // High z-index to be on top
            }}
          >
            <VscChevronRight size={24} />
          </IconButton>
        )}

        <ChatItem
          chats={chatsForSidebar}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          activeChatId={currentChatId}
          onDeleteChat={handleDeleteChat}
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={handleSidebarToggle}
          isSmallScreen={isSmallScreen}
        />

        {/* ChatMain - conditionally rendered based on screen size and sidebar open state */}
        {(!isSmallScreen || !isSidebarOpen) && (
          <ChatMain
            currentChatId={currentChatId}
            allConversations={allConversations}
            setAllConversations={setAllConversations}
            setCurrentChatId={setCurrentChatId}
            onDeleteAllChats={handleDeleteAllChats}
            sx={{
              flexGrow: 1, // Allow ChatMain to take remaining space
              overflowY: "auto", // Enable scrolling for chat content
              // On small screens, if ChatMain is visible, it takes full width
              // On large screens, it adjusts based on sidebar width
              width: { xs: '100%', md: isSidebarOpen ? 'calc(100% - 320px)' : 'calc(100% - 60px)' },
            }}
          />
        )}

        {isSmallScreen && isSidebarOpen && ( // Close button only on small screens when sidebar is open
          <IconButton
            onClick={handleSidebarToggle}
            sx={{
              position: "absolute",
              top: 10,
              right: 10, // Position on the right for closing
              color: "#888",
              zIndex: 1000, // High z-index to be on top
            }}
          >
            <VscChevronLeft size={24} />
          </IconButton>
        )}
      </Box>
    </ThemeProvider>
  );
}