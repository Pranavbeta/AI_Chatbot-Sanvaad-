import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const highlights = [
  {
    title: "Fast & Reliable",
    desc: "Lightning-fast responses and 99.9% uptime for uninterrupted chats.",
  },
  {
    title: "Gen Z Focused",
    desc: "Trendy, intuitive, and designed for the next generation of users.",
  },
  {
    title: "Continuous Updates",
    desc: "New features and improvements added regularly based on your feedback.",
  },
];

const WhyChooseUsSection = () => (
  <Box sx={{ py: 8, background: "#fff" }}>
    <Typography variant="h4" align="center" fontWeight={700} gutterBottom sx={{ color: "#000" }}>
      What Makes Sanvaad the Ultimate AI Companion for You
    </Typography>
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
      {highlights.map((item) => (
        <Grid item xs={12} sm={4} key={item.title}>
          <Card sx={{ minHeight: 160, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {item.title}
              </Typography>
              <Typography color="text.secondary">{item.desc}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default WhyChooseUsSection; 