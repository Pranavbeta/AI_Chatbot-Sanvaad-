import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => (
  <Box sx={{ py: 4, background: "#efffec", textAlign: "center", mt: 8 }}>
    <Typography variant="h6" fontWeight={700} gutterBottom sx={{color:"#7a1f1f"}}>
      Sanvaad
    </Typography>
    <Box sx={{ mb: 1 }}>
      <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
        Home
      </Link>
      <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
        Features
      </Link>
      <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
        FAQ
      </Link>
      <Link href="#" underline="hover" color="inherit" sx={{ mx: 1 }}>
        Contact
      </Link>
    </Box>
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} Sanvaad. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
