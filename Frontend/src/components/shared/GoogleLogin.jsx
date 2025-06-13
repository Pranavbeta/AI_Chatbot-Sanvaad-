import React, { useEffect } from "react";
import {useGoogleLogin} from '@react-oauth/google'
import { Google } from '@mui/icons-material';
import { FcGoogle } from "react-icons/fc";
import {
    Box,
    Button,
    Container,
  } from '@mui/material';
import { googleAuth } from "../../helper/api-communicator";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
  
function GoogleLogin() {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (auth.isLoggedIn && auth.user) {
            navigate("/chat");
        }
    }, [auth.isLoggedIn, auth.user, navigate]);

    const responseGoogle = async (authResult)=>{
        try{
            if(authResult['code']){
                const result = await googleAuth(authResult['code']);
                const { email, name, token } = result.data;
                auth.googleLoginUpdate(email, name);
                const obj = { email, name, token };
                localStorage.setItem('user-info', JSON.stringify(obj));
                console.log('result.data---', result.data);
            }
        }catch(err){
            console.error('Error While requesting google code: ' , err)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code' 

    })
    return(
        <Container maxWidth="sm" sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
            <Button
                fullWidth
                variant="outlined"
                startIcon={<FcGoogle size={24} />}
                sx={{
                    bgcolor: '#adff9d',
                    color: '#222',
                    fontWeight: 600,
                    py: { xs: 1, sm: 1.2 },
                    px: { xs: 2, sm: 3 },
                    fontSize: { xs: 14, sm: 16 },
                    borderColor: '#eee',
                    mb: 2,
                    '&:hover': {
                        borderColor: '#adff9d',
                        bgcolor: '#8cff76',
                        transform: 'scale(1.02)',
                        transition: 'all 0.2s ease-in-out'
                    },
                    '&:active': {
                        transform: 'scale(0.98)'
                    }
                }}
                onClick={googleLogin}
            > Login With Google 
            </Button>
        </Container>
    )
}
export default GoogleLogin