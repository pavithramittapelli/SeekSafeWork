import React, { useState, useContext } from 'react';
import { TextField, Button, Link, Typography, Grid,Snackbar } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext'
import Header from './Header';

const Signin = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const { userInfo, setUserInfo, isLoading } = useContext(UserContext)
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [mailVerified, setMailVerified] = useState(false);
  const [sendOtpDisabled, setSendOtpDisabled] = useState(true);
  const [verifyOtpDisabled, setVerifyOtpDisabled] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  async function handleSendOtp(event) {
     setSendOtpDisabled(true); 
    setTimeout(() => {
      setSendOtpDisabled(false);
    }, 10000);
    try {
      const response = await fetch(`https://seek-safe-work.vercel.app/sendOtp/${email}`);
      if (response.ok) {
          console.log("Valid Email and OTP sent");
        setSnackbarMessage('OTP sent');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
          const data = await response.json();
          setEmailError(data.errors.email);
          console.error("Error sending OTP:", data.errors.email);
      }
  } catch (error) {
      console.error("Error sending OTP:", error);
      // Handle any other errors, such as network errors
       setSnackbarMessage('OTP sending failed');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
  }
    
  }

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
    setOtpError('');
    if(otp.length>4)
      setVerifyOtpDisabled(false)
    else setVerifyOtpDisabled(true)
  }

 
  const handleVerifyOtp = (event) => {
    fetch(`https://seek-safe-work.vercel.app/verifyOtp/${otp}`)
      .then(response => {
        if (response.ok) {
          setMailVerified(true);
          setSnackbarMessage('OTP verification successful');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Wrong OTP, please try again.');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error during OTP verification:', error);
        setSnackbarMessage('Error during OTP verification');
        setSnackbarOpen(true);
      });
  }
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    setUserNameError('');
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailError('');
    setSendOtpDisabled(newEmail.trim() === '');
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handlePincodeChange = (event) => {
    let value = event.target.value.replace(/\D/, ''); // Remove non-numeric characters
    value = value.slice(0, 6); // Limit to 6 digits
    setPincode(value);
    setPincodeError(value.length === 6 ? '' : 'Please enter a 6-digit pincode');
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isValidKey = /^\d+$/.test(keyValue); // Check if the key pressed is a number
    if (!isValidKey) {
      event.preventDefault(); // Prevent non-numeric characters from being entered
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('https://seek-safe-work.vercel.app/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, userName, pincode }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        response.json().then(userInfo => {

          setPasswordError('');
          console.log(userInfo)
          setUserInfo(userInfo)
          setRedirect(true)
        })
      }
      else {
        const data = await response.json()
        console.log(data.errors);
        setPincodeError(data.errors.pincode);
        setUserNameError(data.errors.userName)
        setEmailError(data.errors.email)
        setPasswordError(data.errors.password)
      }

    } catch (error) {
      console.error('Error during registration:', error);
      console.log(error.data)
      
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Header />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button size="small" onClick={handleCloseSnackbar}
          sx={{
            color: 'white', // Set color to white
          }}
          >
            Close
          </Button>
        }
        ContentProps={{
          sx: { backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336' }
        }}
      />

      <Grid container direction="row" style={{ backgroundColor: '#e3e3e3', minHeight: '100vh', padding: '0', margin: '0' }}>
        {/* Hide this item for smaller screens */}
        <Grid item xs={0} sm={6} sx={{ display: { xs: 'none', sm: 'block' }, paddingLeft: '5%', paddingTop: '4%' }}>
          <div>
            <Typography component="h1" variant="h6" style={{ marginBottom: '2vh', color: '#001f3f', fontWeight: 'bold', margin: '35px' }}>
              SeekSafeWork
            </Typography>
            <Typography component="h2" variant="h3" style={{ marginBottom: '2vh', color: '#4c6278', fontWeight: 'bold', margin: '35px' }}>
              Grab the safest work nearby you.
            </Typography >
            <Typography style={{ marginBottom: '2vh', color: '#4c6278', margin: '35px' }}>
              "SeekSafeWork" implies searching or pursuing opportunities for safe and secure employment or freelance work.
              It suggests a proactive approach to finding work that prioritizes safety and security,
              indicating a desire for trustworthy and reliable job opportunities.
            </Typography>
          </div>
        </Grid>

        <Grid item component="main" maxWidth="xs" sx={{ marginTop: '30px', padding: '0% 5%' }} xs={12} sm={6}>
          <div style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '30px 30px', boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)', marginRight: '30px', marginLeft: '10px', marginTop: '44px' }}>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <CreateIcon style={{ fontSize: 30, color: '#3f51b5' }} />
                  <Typography component="h1" variant="h5" style={{ color: '#3f51b5', fontWeight: 'bold' }}>
                    SIGN UP
                  </Typography>
                </Grid>
                {!mailVerified && <>
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
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '50px', // Set your desired height here
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={handleSendOtp}
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ color: '#fff' }}
                      disabled={sendOtpDisabled}
                    >
                      Send Otp
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="otp"
                      label="otp"
                      name="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      error={!!otpError}
                      helperText={otpError}
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '50px', // Set your desired height here
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={handleVerifyOtp}
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ color: '#fff' }}

                      disabled={verifyOtpDisabled}
                    >
                      Verify Otp
                    </Button>
                  </Grid>
                </>}
                {mailVerified && <>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      name="userName"
                      // autoFocus
                      value={userName}
                      onChange={handleUserNameChange}
                      error={!!userNameError}
                      helperText={userNameError}
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '50px', // Set your desired height here
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="Pincode"
                      label="Pincode"
                      name="pincode"
                      value={pincode}
                      onChange={handlePincodeChange}
                      onKeyPress={handleKeyPress}
                      error={!!pincodeError}
                      helperText={pincodeError}
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '50px', // Set your desired height here
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '50px', // Set your desired height here
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ color: '#fff' }}
                    >
                      Sign UP
                    </Button>
                  </Grid>
                </>}

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
