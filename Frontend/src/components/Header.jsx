import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./shared/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Features", to: "#features" },
  { label: "About", to: "#about" },
  { label: "Contact", to: "#contact" },
];

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  // Scroll to section handler
  const handleNavClick = (to, label) => (e) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(to.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (label === "Home") {
      navigate("/");
    }
    setMobileMenuAnchor(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      sx={{ 
        bgcolor: "transparent", 
        position: "static", 
        boxShadow: "none", 
        p: 0,
        width: '100%'
      }}
      elevation={0}
    >
      <Toolbar 
        sx={{ 
          justifyContent: "space-between", 
          minHeight: { xs: 60, md: 80 }, 
          px: { xs: 2, sm: 3, md: 6 }, 
          background: "#efffec",
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: { xs: 1, md: 0 }
        }}
      >
        {/* Logo Left */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo />
          <span style={{ 
            fontWeight: 700, 
            fontSize: { xs: 20, md: 24 }, 
            color: "#7a1f1f", 
            marginLeft: 8 
          }}>Sanvaad</span>
        </Box>

        {/* Desktop Navigation */}
        <Paper
          elevation={3}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            borderRadius: 8,
            px: 2,
            py: 0.5,
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.04)",
            bgcolor: "#fff",
            minWidth: 340,
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          {navLinks.map((link) => (
            <Box
              key={link.label}
              component="button"
              onClick={handleNavClick(link.to, link.label)}
              sx={{
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#444",
                fontWeight: 500,
                borderRadius: 20,
                px: 2.5,
                py: 1,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "none",
                transition: "all 0.2s",
                mr: 1,
                '&:hover': {
                  background: "#e6e6e6",
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
                },
              }}
            >
              {link.label}
            </Box>
          ))}
        </Paper>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ 
            display: { xs: 'flex', md: 'none' },
            color: '#7a1f1f'
          }}
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiPaper-root': {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)',
            }
          }}
        >
          {navLinks.map((link) => (
            <MenuItem
              key={link.label}
              onClick={handleNavClick(link.to, link.label)}
              sx={{
                py: 1.5,
                px: 2,
                fontSize: 16,
                color: '#444',
                '&:hover': {
                  background: '#f5f5f5',
                }
              }}
            >
              {link.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Right Button */}
        <Button
          variant="contained"
          sx={{
            bgcolor: "#adff9d",
            color: "#7a1f1f",
            fontWeight: 600,
            borderRadius: 2,
            px: { xs: 2, md: 3 },
            py: { xs: 0.8, md: 1 },
            fontSize: { xs: 14, md: 16 },
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
            textTransform: "none",
            '&:hover': { 
              bgcolor: "#8cff76",
              transform: 'scale(1.02)',
              transition: 'all 0.2s ease-in-out'
            },
            '&:active': {
              transform: 'scale(0.98)'
            }
          }}
          onClick={() => navigate('/signup')}
        >
          Try For Free
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;