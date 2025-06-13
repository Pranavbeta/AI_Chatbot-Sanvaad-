// LoginPage.jsx
import React, { useEffect } from 'react';
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import GoogleLogin from '../components/shared/GoogleLogin';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid
} from '@mui/material';


const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
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
        <Box sx={{marginLeft:4, width: '100%', maxWidth: 380 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom sx={{color:"#000"}}>
            Welcome back
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Welcome back! Please enter your details.
          </Typography>
          <form onSubmit={handleSubmit}>
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
              sx={{ mb: 1.5 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <FormControlLabel control={<Checkbox size="small"/>} label={<Typography fontSize={14} sx={{color:"#000"}}>Remember for 30 days</Typography>} />
              <Link to="#" style={{ color: '#8cff76', fontSize: 14, textDecoration: 'none' }}>Forgot Password</Link>
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#8cff76', color: '#fff', fontWeight: 600, py: 1.2, fontSize: 16, mb: 2, boxShadow: 'none', '&:hover': { bgcolor: '#8cff76' } }}
            >
              Sign in
            </Button>
            <GoogleLogin/>
          </form>
          <Typography align="center" mt={2} color="text.secondary">
            Don&apos;t have an account?{' '}
            <Link to="/signup" style={{ color: '#adff9d', textDecoration: 'none', fontWeight: 500 }}>Sign up</Link>
          </Typography>
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
            bgcolor: '#adff9d',
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
            background: 'radial-gradient(circle, #8cff76 0%, #fff7f4 80%)',
            zIndex: 1,
          }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
