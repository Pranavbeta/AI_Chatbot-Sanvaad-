import React, { useState } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Switch,
  Button,
  Divider,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationDialog from './ConfirmationDialog';

export default function SettingsDialog({ open, onClose, onDeleteAllChats }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOpenConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleDeleteAllConfirmed = () => {
    onDeleteAllChats(); // Call the passed-in function
    handleCloseConfirmation();
    onClose(); // Close settings dialog after confirmation
  };

  return (
    <Dialog fullScreen={false} open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative', bgcolor: "#222" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: "#111", color: "#fff", flexGrow: 1, display: 'flex' }}>
        <List sx={{ width: '250px', bgcolor: "#222", p: 2 }}>
          <ListItem button selected>
            <ListItemText primary="General" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Personalization" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Speech" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Data controls" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Builder profile" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Connected apps" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Secure sign in" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Security" />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1, p: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>General</Typography>
          <List>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary="Theme" />
              <Typography variant="body2" sx={{ color: '#bbb' }}>Dark</Typography>
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "#555" }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary="Always show code when using data analyst" />
              <Switch defaultChecked />
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "#555" }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary="Show follow up suggestions in chats" />
              <Switch defaultChecked />
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "#555" }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary="Language" />
              <Typography variant="body2" sx={{ color: '#bbb' }}>Auto-detect</Typography>
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "#555" }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary="Archived chats" />
              <Button variant="outlined" sx={{ color: "#bbb", borderColor: "#bbb" }}>Manage</Button>
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "#555" }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary="Archive all chats" />
              <Button variant="outlined" sx={{ color: "#bbb", borderColor: "#bbb" }}>Archive all</Button>
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "#555" }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary="Delete all chats" />
              <Button variant="contained" color="error" onClick={handleOpenConfirmation}>Delete all</Button>
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "#555" }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary="Log out on this device" />
              <Button variant="outlined" sx={{ color: "#bbb", borderColor: "#bbb" }}>Log out</Button>
            </ListItem>
          </List>
        </Box>
      </Box>
      <ConfirmationDialog
        open={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleDeleteAllConfirmed}
        message="Are you sure you want to delete all chats? This action cannot be undone."
      />
    </Dialog>
  );
} 