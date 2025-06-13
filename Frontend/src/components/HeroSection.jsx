import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const images = [
  "golden_robo.png",
  "robo.png", // Placeholder for second image
  "child_robo.jpg", // Placeholder for third image
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds (3000 ms)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);
  
  return (
    <Box sx={{ textAlign: "center", py: 8, background: "linear-gradient(180deg, #fff 60%, #ceffc5 100%)" }}>
      <Typography variant="h2" fontWeight={700} gutterBottom sx={{ color: "#000" }}>
        Seamless & Intelligent AI Experiences for Gen Z
      </Typography>
    <Typography variant="h5" color="text.secondary" gutterBottom>
      Your AI companion for smarter, faster, and more fun conversations.
    </Typography>
    <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }} onClick={() => navigate('/signup')}>
      Get Started 
    </Button>
    <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
      {/* Carousel Container */}
      <Box sx={{ width: 220, height: 440, bgcolor: "#eee", borderRadius: 6, boxShadow: 3, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img
          src={images[currentImageIndex]}
          alt={`image_${currentImageIndex}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 1s ease-in-out" }}
        />
      </Box>
    </Box>
  </Box>
);
}
export default HeroSection;