import React, { useState } from 'react';
import {
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Popover,
} from '@mui/material';
import {
  StarBorderOutlined,
  SettingsOutlined,
  KeyboardOutlined,
  HelpOutline,
  DescriptionOutlined,
  PolicyOutlined,
  CloudUploadOutlined,
  LogoutOutlined,
  TuneOutlined,
} from '@mui/icons-material';
import NavigationLink from '../shared/NavigationLink';
import { useAuth } from '../../context/AuthContext';
import SettingsDialog from '../shared/SettingsDialog';

export default function UserMenuDialog({ open, onClose, userEmail, onLogout, anchorEl, onDeleteAllChats }) {
  const auth = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
    onClose(); // Close the UserMenuDialog when SettingsDialog opens
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{ sx: { bgcolor: "#000", color: "#fff", borderRadius: 2 } }}
      >
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#fff" }}>
            {userEmail}
          </Typography>
          <Divider sx={{ my: 1, bgcolor: "#555" }} />
          <List dense>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <StarBorderOutlined sx={{ color: "#bbb" }} />
              </ListItemIcon>
              <ListItemText primary="Upgrade Plan" />
            </ListItem>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <TuneOutlined sx={{ color: "#bbb" }} />
              </ListItemIcon>
              <ListItemText primary="Customize Sanvaad" />
            </ListItem>
            <ListItem button onClick={handleSettingsOpen}>
              <ListItemIcon>
                <SettingsOutlined sx={{ color: "#bbb" }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <KeyboardOutlined sx={{ color: "#bbb" }} />
              </ListItemIcon>
              <ListItemText primary="Keyboard shortcuts" />
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "#555" }} />
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <HelpOutline sx={{ color: "#bbb" }} />
              </ListItemIcon>
              <ListItemText primary="Help & FAQ" />
            </ListItem>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <DescriptionOutlined sx={{ color: "#bbb" }} />
              </ListItemIcon>
              <ListItemText primary="Release notes" />
            </ListItem>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <PolicyOutlined sx={{ color: "#bbb" }} />
              </ListItemIcon>
              <ListItemText primary="Terms & policies" />
            </ListItem>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <CloudUploadOutlined sx={{ color: "#bbb" }} />
              </ListItemIcon>
              <ListItemText primary="Get ChatGPT search extension" />
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "#555" }} />
            <ListItem button onClick={onLogout}>
              <ListItemIcon>
                <LogoutOutlined sx={{ color: "#bbb" }} />
              </ListItemIcon>
              <NavigationLink 
                textColor="#fff"
                to="/"
                text="logout"
                onClick={auth.logout}
                textDecoration = "none"
              />
            </ListItem>
          </List>
        </DialogContent>
      </Popover>
      <SettingsDialog open={settingsOpen} onClose={handleSettingsClose} onDeleteAllChats={onDeleteAllChats} />
    </>
  );
} 