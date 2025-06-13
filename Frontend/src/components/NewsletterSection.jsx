import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const NewsletterSection = () => (
  <Box sx={{ py: 8, background:"linear-gradient(180deg, #fff 30%, #ceffc5 100%)", textAlign: "center" }}>
    <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: "#000" }}>
      Get the Newest Updates First
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
      Subscribe to our newsletter for product news and intelligent updates.
    </Typography>
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
      <TextField label="Your email" variant="outlined" size="small" sx = {{color:"#000"}} />
      <Button variant="contained" color="primary" size="medium">
        Subscribe
      </Button>
    </Box>
  </Box>
);

export default NewsletterSection; 