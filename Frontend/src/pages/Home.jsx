import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import FeaturesSection from "../components/FeaturesSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import NewsletterSection from "../components/NewsletterSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/footer/Footer";
import { Box, Container } from "@mui/material";

const Home = () => (
  <Box sx={{ 
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }}>
    <Header />
    <Container 
      maxWidth="xl" 
      sx={{ 
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
        flex: 1
      }}
    >
      <Box id="home" sx={{ mb: { xs: 4, md: 6 } }}><HeroSection /></Box>
      <Box id="features" sx={{ mb: { xs: 4, md: 6 } }}><StatsSection /></Box>
      <Box id="about" sx={{ mb: { xs: 4, md: 6 } }}><WhyChooseUsSection /></Box>
      <Box id="contact" sx={{ mb: { xs: 4, md: 6 } }}><NewsletterSection /></Box>
      <Box sx={{ mb: { xs: 4, md: 6 } }}><FeaturesSection /></Box>
      <Box sx={{ mb: { xs: 4, md: 6 } }}><FAQSection /></Box>
    </Container>
    <Footer />
  </Box>
);

export default Home;
