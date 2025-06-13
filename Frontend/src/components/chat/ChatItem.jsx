// components/Sidebar.jsx
import React, { useState } from "react";
import {
  Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button, TextField,Avatar, IconButton, Menu, MenuItem
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import FolderIcon from "@mui/icons-material/Folder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import Logo from "../../components/shared/Logo";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc"; // Re-import icons for internal toggle

const folders = [
  { name: "Work chats", color: "#b2ff59" },
  { name: "Life chats", color: "#b388ff" },
  { name: "Projects chats", color: "#ffd740" },
  { name: "Clients chats", color: "#80d8ff" },
];

export default function ChatItem({ chats, onNewChat, onSelectChat, activeChatId, onDeleteChat, isSidebarOpen, onSidebarToggle, isSmallScreen }) {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChatIdForMenu, setSelectedChatIdForMenu] = useState(null);

  const handleMenuClick = (event, chatId) => {
    setAnchorEl(event.currentTarget);
    setSelectedChatIdForMenu(chatId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChatIdForMenu(null);
  };

  const handleDeleteChat = () => {
    if (selectedChatIdForMenu) {
      onDeleteChat(selectedChatIdForMenu);
      handleMenuClose();
    }
  };

  return (
    <Box
      sx={{
        width: isSmallScreen ? (isSidebarOpen ? 320 : 0) : (isSidebarOpen ? 320 : 60), // Responsive width
        bgcolor: "#181818",
        p: isSmallScreen ? (isSidebarOpen ? 2 : 0) : (isSidebarOpen ? 2 : 0), // Responsive padding
        borderRadius: 3,
        m: 2,
        display: isSmallScreen && !isSidebarOpen ? "none" : "flex", // Hide entirely on small screens when closed
        flexDirection: "column",
        height: "95vh",
        transition: "width 0.3s ease-in-out, padding 0.3s ease-in-out, left 0.3s ease-in-out", // Added left for transition
        position: isSmallScreen ? "absolute" : "relative", // Absolute position for overlay on small screens
        left: isSmallScreen ? (isSidebarOpen ? 0 : -320) : "unset", // Slide in/out on small screens
        zIndex: isSmallScreen ? 999 : "unset", // High z-index for overlay
        overflow: "hidden", // Hide content that overflows when collapsed
      }}
    >
      {!isSmallScreen && ( // Only show toggle button on larger screens
        <IconButton
          onClick={onSidebarToggle}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "#888",
            zIndex: 1,
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
          }}
        >
          {isSidebarOpen ? <VscChevronLeft size={20} /> : <VscChevronRight size={20} />}
        </IconButton>
      )}

      {isSidebarOpen && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              gap: 0,
            }}
          >
            <Logo />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Sanvaad
            </Typography>
          </Box>
          <TextField
            size="small"
            placeholder="Search"
            variant="outlined"
            sx={{ mb: 2, bgcolor: "#222", borderRadius: 1 }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <Typography variant="subtitle2" sx={{ color: "#aaa", mb: 1 }}>
            Folders
          </Typography>
          <List dense>
            {folders.map((folder) => (
              <ListItem key={folder.name} sx={{ pl: 0 }}>
                <ListItemIcon>
                  <FolderIcon sx={{ color: folder.color }} />
                </ListItemIcon>
                <ListItemText primary={folder.name} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1, bgcolor: "#333" }} />
          <Typography variant="subtitle2" sx={{ color: "#aaa", mb: 1 }}>
            Chats
          </Typography>
          <List dense sx={{ flexGrow: 1, overflowY: "auto" }}>
            {chats.map((chat) => (
              <ListItem
                key={chat.id}
                sx={{
                  pl: 0,
                  bgcolor: chat.id === activeChatId ? "#333" : "transparent",
                  "&:hover": {
                    bgcolor: "#2a2a2a",
                  },
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => onSelectChat(chat.id)}
              >
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                  <ListItemIcon>
                    <ChatBubbleOutlineIcon sx={{ color: "#888" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={chat.title}
                    secondary={chat.desc}
                    primaryTypographyProps={{ color: "#fff", fontWeight: 500 }}
                    secondaryTypographyProps={{ color: "#aaa", fontSize: 12 }}
                  />
                </Box>
                <IconButton 
                  onClick={(event) => handleMenuClick(event, chat.id)}
                  size="small"
                  sx={{ color: "#888" }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedChatIdForMenu === chat.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleDeleteChat}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </Menu>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              mt: 2,
              bgcolor: "#00FF41",
              color: "#111",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": { bgcolor: "#00cc33" },
            }}
            fullWidth
            onClick={onNewChat}
          >
            New chat
          </Button>
        </>
      )}
    </Box>
  );
}