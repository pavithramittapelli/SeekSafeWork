import React, { useState, useContext } from 'react';
import { TextField, Button, Link, Typography, Grid } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';
import Header from './Header';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo, isLoading } = useContext(UserContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
    setOtpError('');
  };

  const handleEmailVerification = () => {
    // Here you can implement logic to verify the OTP
    // For demonstration purposes, let's assume the OTP is correct
    setIsEmailOtpVerified(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEmailOtpVerified) {
      // Proceed with username, pincode, and password submission
      // Implement your logic here
    } else {
      // Show error if email OTP is not verified
      setOtpError('Please verify your email OTP first.');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <Header />
      <Grid container direction="row" style={{ backgroundColor: '#e3e3e3', minHeight: '100vh', padding: '0', margin: '0' }}>
        <Grid item component="main" maxWidth="xs" sx={{ marginTop: '30px' ,padding: '0% 5%'}} xs={12} sm={6}>
          <div style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '30px 30px', boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',marginRight:'30px' ,marginLeft:'10px', marginTop:'44px' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <CreateIcon style={{ fontSize: 30, color: '#3f51b5' }} />
                  <Typography component="h1" variant="h5" style={{ color: '#3f51b5', fontWeight: 'bold' }}>
                    SIGN UP
                  </Typography>
                </Grid>
                {!isEmailOtpVerified && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="otp"
                        label="OTP"
                        name="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        error={!!otpError}
                        helperText={otpError}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleEmailVerification}
                      >
                        Verify Email OTP
                      </Button>
                    </Grid>
                  </>
                )}
                {isEmailOtpVerified && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        // Add your username state and change handler here
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        // Add your password state and change handler here
                      />
                    </Grid>
                  </>
                )}
                <Typography component="div" style={{ marginTop: '1vh', textAlign: 'center' }}>
                  <Link href="login" variant="body2" >
                    Already Registered? Login
                  </Link>
                </Typography>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Signin;
