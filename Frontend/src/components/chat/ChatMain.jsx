// components/ChatMain.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Chip, Card, CardContent, Grid, TextField, InputAdornment, IconButton ,Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText, Paper} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../context/AuthContext";
import {
  getUserChats,
  sendChatRequest,
} from "../../helper/api-communicator";
import UserMenuDialog from "./UserMenuDialog";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


const parseChatContent = (message) => {
  const blocks = [];
  const parts = message.split("```");

  parts.forEach((part, index) => {
    if (index % 2 === 1) { // Code block
      blocks.push({ type: "code", content: part.trim() });
    } else { // Text block, check for tables or lists
      const lines = part.split('\n');
      let inTable = false;
      let inList = false;
      let currentTable = { headers: [], rows: [] };
      let currentList = [];

      lines.forEach(line => {
        if (line.trim().startsWith('|') && line.includes('---') && !inTable) { // Start of a table
          inTable = true;
          if (currentList.length > 0) {
            blocks.push({ type: "list", content: currentList });
            currentList = [];
          }
          const headerLine = lines[lines.indexOf(line) - 1];
          currentTable.headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
          // Skip separator line
        } else if (inTable && line.trim().startsWith('|')) { // Table row
          currentTable.rows.push(line.split('|').map(c => c.trim()).filter(c => c));
        } else if (inTable && !line.trim().startsWith('|')) { // End of table
          inTable = false;
          blocks.push({ type: "table", content: currentTable });
          currentTable = { headers: [], rows: [] };
          if (line.trim() !== '') {
            blocks.push({ type: "text", content: line });
          }
        } else if (line.match(/^\s*[-*+]\s/) || line.match(/^\s*\d+\.\s/)) { // List item
          inList = true;
          if (inTable) { // Should not happen, but for safety
            blocks.push({ type: "table", content: currentTable });
            currentTable = { headers: [], rows: [] };
            inTable = false;
          }
          currentList.push(line.trim());
        } else if (inList && line.trim() !== '') { // Continue list or end list
          if (line.match(/^\s*[-*+]\s/) || line.match(/^\s*\d+\.\s/)) {
            currentList.push(line.trim());
          } else {
            inList = false;
            blocks.push({ type: "list", content: currentList });
            currentList = [];
            blocks.push({ type: "text", content: line });
          }
        } else { // Plain text
          if (inTable) {
            blocks.push({ type: "table", content: currentTable });
            currentTable = { headers: [], rows: [] };
            inTable = false;
          }
          if (currentList.length > 0) {
            blocks.push({ type: "list", content: currentList });
            currentList = [];
            inList = false;
          }
          if (line.trim() !== '') {
            blocks.push({ type: "text", content: line });
          }
        }
      });
      // After iterating all lines, push any pending table/list
      if (inTable) {
        blocks.push({ type: "table", content: currentTable });
      }
      if (currentList.length > 0) {
        blocks.push({ type: "list", content: currentList });
      }
    }
  });
  return blocks;
};


const promptCards = [
  {
    title: "Saved Prompt Templates",
    desc: "Users save and reuse prompt templates for faster responses.",
  },
  {
    title: "Media Type Selection",
    desc: "Users select media type for tailored interactions.",
  },
  {
    title: "Multilingual Support",
    desc: "Choose language for better interaction.",
  },
];

export default function ChatMain({ currentChatId, allConversations, setAllConversations, setCurrentChatId, onDeleteAllChats , sx }) {
  const [showInitialView, setShowInitialView] = useState(true);
  const [message, setMessage] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]); // Messages for the active chat

  useEffect(() => {
    if (currentChatId && allConversations[currentChatId]) {
      setCurrentMessages(allConversations[currentChatId].messages);
      setShowInitialView(false);
    } else {
      setShowInitialView(true);
    }
  }, [currentChatId, allConversations]);

  const handleSendMessage = async () => {
    if (!currentChatId) return; // Cannot send message if no chat is active
    if (message.trim()) {
      const content = message.trim();
      setMessage("");
      setShowInitialView(false);

      const newUserMessage = { role: "user", content };
      const updatedMessages = [...(allConversations[currentChatId]?.messages || []), newUserMessage];

      setAllConversations(prev => ({
        ...prev,
        [currentChatId]: {
          messages: updatedMessages,
          title: prev[currentChatId]?.title || "New Chat"
        }
      }));

      try {
        const isNewChat = currentChatId.startsWith("chat-");
        const chatData = await sendChatRequest(content, isNewChat ? null : currentChatId); // Pass chatId only if it's not a temporary ID

        const botMessage = { role: "assistant", content: chatData.chats[chatData.chats.length - 1].content };
        const finalMessages = [...updatedMessages, botMessage];

        setAllConversations(prev => {
          const newConversations = { ...prev };
          if (isNewChat) {
            // If it was a new chat, replace the temporary ID with the real ID from the backend
            delete newConversations[currentChatId];
            newConversations[chatData.chatId] = { messages: finalMessages, title: chatData.title };
            // Update the currentChatId to the real one
            // This part needs to be handled in the parent component (Chat.jsx) if currentChatId is there
            // For now, let's assume ChatMain controls it, but if it's passed down, Chat.jsx needs to update it.
          } else {
            newConversations[currentChatId] = { messages: finalMessages, title: chatData.title };
          }
          return newConversations;
        });

        // If it was a new chat, update currentChatId to the real chatId received from backend
        if (isNewChat && chatData.chatId) {
          // This is a direct update in ChatMain.jsx. If currentChatId is truly controlled by Chat.jsx,
          // then Chat.jsx needs to receive this update.
          // For now, assuming currentChatId here is the source of truth for ChatMain.
          if (currentChatId !== chatData.chatId) {
             // This is a hacky way to trigger re-render and reflect the new chat ID in the sidebar if ChatMain controlled currentChatId.
             // Since currentChatId is passed as prop, this needs to be set in the parent (Chat.jsx).
             // The real solution is to emit an event or pass a setter function for currentChatId from Chat.jsx.
             // For now, I'll rely on the `setAllConversations` to trigger a re-render in `Chat.jsx` and update `chatsForSidebar`.
          }
        }

      } catch (error) {
        console.error("Error sending chat request:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const auth = useAuth();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };


  return (
    <Box
    sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
        ...sx, // <-- merge external styles
      }}
    
    >
      <Avatar 
        sx={{ 
          position: "absolute",
          top: 20,
          right: 20,
          bgcolor: "black", 
          color: "white",
          width: 40,
          height: 40
        }}
        onClick={handleOpenMenu}
      >
        {auth?.user?.name?.charAt(0)}
        {auth?.user?.name?.split(" ")[1]?.charAt(0)}
      </Avatar>
      {showInitialView ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 'calc(100% - 20px)', sm: 700 },
            mx: "auto",
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: 6,
            p: { xs: 2, sm: 4 },
            mb: 2,
          }}
        >
          <Typography variant="h5" color="#ddd" sx={{ mb: 4, textAlign: "center", fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            Hello! How can I assist you today? 🙂
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {promptCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    bgcolor: "#222",
                    color: "#fff",
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      {card.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Chip label="Chat GPT 5.0" color="success" size="small" sx={{ fontWeight: "bold" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
            <Chip label="All" color="success" variant="filled" />
            <Chip label="Text" variant="outlined" />
            <Chip label="Image" variant="outlined" />
            <Chip label="Video" variant="outlined" />
            <Chip label="Music" variant="outlined" />
            <Chip label="Analytics" variant="outlined" />
          </Box>
          <TextField
            fullWidth
            placeholder="Type your prompt here..."
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              bgcolor: "#181818",
              borderRadius: 2,
              input: { color: "#fff" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage}>
                    <SendIcon sx={{ color: "#00FF41" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 'calc(100% - 20px)', sm: 700 },
            mx: "auto",
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: 6,
            p: { xs: 2, sm: 4 },
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "auto",
              scrollBehavior: "smooth",
            }}
          >
            {currentMessages.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: chat.role === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    p: 2,
                    borderRadius: 2,
                    bgcolor: chat.role === "user" ? "#00FF41" : "#232323",
                    color: chat.role === "user" ? "#000" : "#fff",
                  }}
                >
                  {parseChatContent(chat.content).map((block, i) => (
                    block.type === "code" ? (
                      <SyntaxHighlighter key={i} style={dark} language="javascript">
                        {block.content}
                      </SyntaxHighlighter>
                    ) : block.type === "table" ? (
                      <TableContainer key={i} component={Paper} sx={{ bgcolor: chat.role === "user" ? "#00FF41" : "#232323", borderRadius: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              {block.content.headers.map((header, headerIndex) => (
                                <TableCell key={`${i}-header-${headerIndex}`} sx={{ fontWeight: "bold", color: chat.role === "user" ? "#000" : "#fff" }}>{header}</TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {block.content.rows.map((row, rowIndex) => (
                              <TableRow key={`${i}-${rowIndex}`}>
                                {row.map((cell, cellIndex) => (
                                  <TableCell key={`${i}-${rowIndex}-${cellIndex}`} sx={{ color: chat.role === "user" ? "#000" : "#fff" }}>{cell}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : block.type === "list" ? (
                      <List key={i} sx={{ color: chat.role === "user" ? "#000" : "#fff" }}>
                        {block.content.map((item, itemIndex) => (
                          <ListItem key={`${i}-${itemIndex}`}>
                            <ListItemText primary={item} sx={{ color: chat.role === "user" ? "#000" : "#fff" }} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography key={i} sx={{ color: chat.role === "user" ? "#000" : "#fff" }}>
                        {block.content}
                      </Typography>
                    )
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
          <TextField
            fullWidth
            placeholder="Type your message..."
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              bgcolor: "#181818",
              borderRadius: 2,
              mt: 2,
              input: { color: "#fff" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage}>
                    <SendIcon sx={{ color: "#00FF41" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
      <Typography align="center" sx={{ color: "#888", mt: 2, fontSize: 14 }}>
        Gemini can make mistakes. Consider checking important information.
      </Typography>
      <UserMenuDialog
        open={openMenu}
        onClose={handleCloseMenu}
        userEmail={auth?.user?.email}
        anchorEl={anchorEl}
        onDeleteAllChats={onDeleteAllChats}
      />
    </Box>
  );
}