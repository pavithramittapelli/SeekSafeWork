import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Link, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from './userContext';
import { Navigate } from 'react-router-dom'
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault()
    const response = await fetch('https://seek-safe-work.vercel.app/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    if (response.ok) {
      response.json().then((userInfo) => {
        console.log(userInfo);
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }
    else {
      alert('Wrong Credentials');
      const err = await response.json();
      setEmailError(err.errors.email);
      setPasswordError(err.errors.password);
    }
  }
  if (redirect)
    return <Navigate to={'/'} />

  return (

    <>
      <Header />
      <Grid container direction="row" style={{ backgroundColor: '#e3e3e3', minHeight: '100vh', padding: '0', margin: '0' }}>
        {/* Hide this item for smaller screens */}
        <Grid item xs={0} sm={6} sx={{ display: { xs: 'none', sm: 'block' }, paddingLeft: '5%', paddingTop: '4%' }}>
          <div>
            <Typography component="h1" variant="h6" style={{ marginBottom: '2vh', color: '#001f3f', fontWeight: 'bold', margin: '35px' }}>
              SeekSafeWork
            </Typography>
            <Typography component="h2" variant="h3" style={{ marginBottom: '2vh', color: '#000000', fontWeight: 'bold', margin: '35px' }}>
              Grab the safest work nearby you.
            </Typography >
            <Typography style={{ marginBottom: '2vh', color: '#4c6278', margin: '35px' }}>
              "SeekSafeWork" implies searching or pursuing opportunities for safe and secure employment or freelance work.
              It suggests a proactive approach to finding work that prioritizes safety and security,
              indicating a desire for trustworthy and reliable job opportunities.
            </Typography>
          </div>
        </Grid>
        <Grid component="main" maxWidth="xs" sx={{ padding: '0% 2%' }} xs={12} sm={6}>
          <div style={{ backgroundColor: '#ffffff', marginTop: '84px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '40px 30px', boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)', marginRight: '50px', marginLeft: '10px' }}>
            <PersonIcon style={{ fontSize: 50, marginBottom: '0.5%', color:'#265073'}} />
            <Typography component="h1" variant="h5" style={{ marginBottom: '2vh', color: '#001f3f', fontWeight: 'bold' }}>
              Login
            </Typography>
            <form
              style={{ width: '100%', }}
              onSubmit={handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                style={{ marginBottom: '1.5vh' }}
                sx={{
                  '& .MuiInputBase-root': {
                    height: '50px', // Set your desired height here
                  },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                style={{ marginBottom: '2.5vh' }}
                sx={{
                  '& .MuiInputBase-root': {
                    height: '50px', // Set your desired height here
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginBottom: '1vh',  color: '#fff' }}
              >
                Login
              </Button>
              <Typography component="div" style={{ marginTop: '1.5vh', textAlign: 'center' }}>
                {/* <Link href="#" variant="body2" style={{ color: '#2196f3' }}>
              Forgot password?
            </Link> */}
              </Typography>
              <Typography component="div" style={{ marginTop: '1vh', textAlign: 'center' }}>
                <Link href="signup" variant="body2" >
                  Don't have an account? Sign up
                </Link>
              </Typography>
            </form>
          </div>
        </Grid>
      </Grid>
    </>

  );
};

export default Login;
