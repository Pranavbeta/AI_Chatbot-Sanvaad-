import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const features = [
  {
    title: "Variety of Models",
    desc: "Choose from multiple AI models for different needs and experiences.",
  },
  {
    title: "Optimized Conversations",
    desc: "Smart suggestions and context-aware responses for seamless chats.",
  },
  {
    title: "Safe & Private",
    desc: "Your data is encrypted and privacy is our top priority.",
  },
];

const FeaturesSection = () => (
  <Box sx={{ py: 8, background:"linear-gradient(180deg, #fff 60%, #ceffc5 100%)" }}>
    <Typography variant="h4" align="center" fontWeight={700} gutterBottom sx={{ color: "#000" }}>
      Sanvaad's Impressive Features
    </Typography>
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
      {features.map((feature) => (
        <Grid item xs={12} sm={4} key={feature.title}>
          <Card sx={{ minHeight: 180, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">{feature.desc}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default FeaturesSection; 