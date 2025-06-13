// LoginPage.jsx
import React, { useEffect } from 'react';
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import GoogleLogin from '../components/shared/GoogleLogin';

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signup Failed", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth, navigate]);

  return (
    <Grid 
      container 
      sx={{
        flexGrow: 1,
        minWidth: 0,
        flex: 1,
        display: 'flex',
        maxWidth: '100%'
      }}
    >
      {/* Left: Form */}
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={6}
        sx={{
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          bgcolor: '#fff', 
          minWidth:'50%'
        }}
      >
        <Box sx={{width: '100%', maxWidth: 380 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: "#000" }}>
            Sign up
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Get your query's best solutions. Already have an account?{' '}
            <Link to="/login" style={{ color: '#8cff76', textDecoration: 'none', fontWeight: 500 }}>Login</Link>
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography fontWeight={500} mb={0.5}>Name</Typography>
            <TextField
              fullWidth
              placeholder="Enter your name"
              name="name"
              type="text"
              margin="dense"
              sx={{ mb: 2 }}
            />
            <Typography fontWeight={500} mb={0.5}>Email</Typography>
            <TextField
              fullWidth
              placeholder="Enter your email"
              name="email"
              type="email"
              margin="dense"
              sx={{ mb: 2 }}
            />
            <Typography fontWeight={500} mb={0.5}>Password</Typography>
            <TextField
              fullWidth
              placeholder="Password"
              name="password"
              type="password"
              margin="dense"
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#adff9d', color: '#fff', fontWeight: 600, py: 1.2, fontSize: 16, mb: 2, boxShadow: 'none', '&:hover': { bgcolor: '#8cff76' } }}
            >
              Sign up
            </Button>
            <GoogleLogin/>
          </form>
        </Box>
      </Grid>
      {/* Right: Visual */}
      <Grid 
        item 
        xs={false} 
        sm={6} 
        md={6}
        sx={{
          height: '100vh', 
          display: { xs: 'none', sm: 'flex' }, 
          alignItems: 'center', 
          justifyContent: 'center', 
          bgcolor: '#fdf7f4', 
          minWidth:'50%'
        }}
      >
        <Box sx={{ position: 'relative', width: 320, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            bgcolor: '#8cff76',
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }} />
          <Box sx={{
            width: 320,
            height: 120,
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: 'transparent',
            filter: 'blur(32px)',
            background: 'radial-gradient(circle, #8cff76 0%,#fff7f4 80%)',
            zIndex: 1,
          }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
