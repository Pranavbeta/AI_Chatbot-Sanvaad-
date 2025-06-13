import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const stats = [
  { value: "300K+", label: "Active Users" },
  { value: "19M+", label: "Messages Sent" },
  { value: "500K+", label: "App Downloads" },
];

const StatsSection = () => (
  <Box sx={{ py: 6, background: "#fff" }}>
    <Grid container spacing={4} justifyContent="center">
      {stats.map((stat) => (
        <Grid item xs={12} sm={4} key={stat.label}>
          <Typography variant="h3" fontWeight={700} color="primary.main">
            {stat.value}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {stat.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default StatsSection; 