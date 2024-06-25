import * as React from 'react';
import { Container, Box, Divider, AppBar, Toolbar, IconButton, Typography, Menu,Skeleton, Button,Avatar,Badge,Tooltip,MenuItem,Dialog, DialogContent, DialogActions } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditCalendarTwoToneIcon from '@mui/icons-material/EditCalendarTwoTone';
import { UserContext } from './userContext'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { green, red, orange, pink, purple, lightGreen } from '@mui/material/colors';
import SSW from './Images/SSw.png'
// const getAvatarColor = (char) => {
//   const colorMap =
//   {
//     R: green[500],
//     S: red[500],
//     P: orange[500],
//     D: pink[500],
//     T: purple[500],
//     N: lightGreen[500],
//     // Add more mappings as needed
//   };
//   return colorMap[char.toUpperCase()] || 'default';
// };
import {
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan,
  teal, green, lightGreen, lime, yellow, amber, orange, deepOrange,
  brown, grey, blueGrey
} from '@mui/material/colors';

const getAvatarColor = (char) => {
  const colorMap = {
    A: red[500],
    B: pink[500],
    C: purple[500],
    D: deepPurple[500],
    E: indigo[500],
    F: blue[500],
    G: lightBlue[500],
    H: cyan[500],
    I: teal[500],
    J: green[500],
    K: lightGreen[500],
    L: lime[500],
    M: yellow[500],
    N: amber[500],
    O: orange[500],
    P: deepOrange[500],
    Q: brown[500],
    R: grey[500],
    S: blueGrey[500],
    T: red[600],
    U: pink[600],
    V: purple[600],
    W: deepPurple[600],
    X: indigo[600],
    Y: blue[600],
    Z: lightBlue[600],
  };
  return colorMap[char.toUpperCase()] || grey[500];
};

const pages = ['Home', 'Aboutus'];

function Header() {
  const { userInfo, setUserInfo, isLoading } = React.useContext(UserContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNotificationClick = (work) => {
    console.log(work._id)
    const url = `/notification?id=${work._id}`;
    // Redirect the user to the new page
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.focus();
    }
  }

  const handleMarkAllAsRead = () => {
    fetch(`https://seek-safe-work.vercel.app/clearNotificatoins/${userInfo.id}`).then(res => {
      res.json().then(data => {
        console.log(data);
        setNotifications([])
      })
    })
  }

  console.log(userInfo);
  React.useEffect(() => {
    if (!isLoading) {
      fetch(`https://seek-safe-work.vercel.app/notification/${userInfo?.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.unviewed)
          setNotifications(data.unviewed); // Set count to the value received from the API
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
        });
    }
  }, [isLoading]);

  console.log(notifications);
  // if (isLoading) {
  //   console.log(userInfo)
  //   return <div>Loading ..... </div>
  // }

  function logout() {
    fetch('https://seek-safe-work.vercel.app/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(res => {

      setUserInfo(null)
      window.location.href = '/'
    })
    // console.log(`from header logout ${userInfo}`)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userName = userInfo?.userName;

  return (
    <AppBar position="fixed" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Skeleton
            variant="rectangular"
            width={200}
            height={50}
            animation="wave"
            sx={{ flexGrow: 1 }}
            style={{ display: isLoading ? 'inline-block' : 'none' }}
          />

         {!isLoading && <>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Avatar component="a" href="/" src={SSW} alt="SSW Logo" sx={{ display: { xs: 'none', md: 'flex' }, width: 40, height: 40, marginRight: '8px' }} />

          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Button
                    key={page}
                    component={Link} // Use Link component for navigation
                    to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                    onClick={handleCloseNavMenu}
                  sx={{ color: 'black' }}
                  >
                    {page}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar component="a" href="/" src={SSW} alt="SSW Logo" sx={{ display: { xs: 'flex', md: 'none' }, width: 40, height: 40, marginRight: '8px' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'hidden', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link} // Use Link component for navigation
                to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {userName && (<>

            <>
              <MenuItem
                onClick={handleDialogOpen}>
                <IconButton size="large" aria-label="show new notifications" color="inherit" >
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <p>Notifications</p>
              </MenuItem>

              <Dialog
                open={openDialog} onClose={handleDialogClose}
                PaperProps={{
                  sx: {
                    position: 'absolute',
                    top: '20px', // Adjust as needed
                    right: '20px', // Adjust as needed
                    minWidth: '300px', // Optional: Adjust width as needed
                    overflowY: 'auto', // Apply vertical scrolling
                    maxHeight: '300px', // Limit max height to 300px
                  }
                }}
              >
                <DialogContent>
                  {notifications.length === 0 && <div>No new Notifications</div>}
                  {notifications.map((work, index) => (
                    <React.Fragment key={work.id}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '5px',
                          cursor: 'pointer', // Add cursor pointer
                          "&:hover": {
                            bgcolor: 'lightyellow', // Change background color on hover
                          },
                        }}
                        onClick={() => handleNotificationClick(work)}

                        component="button" // Set Box as a button
                      >

                        <Avatar alt={userName} src="/static/images/avatar/2.jpg" sx={{ bgcolor: getAvatarColor(userName[0]), m: '2px' }}>
                          {userName[0].toUpperCase()}
                        </Avatar>
                        <Typography sx={{ color: 'black' }}>
                          Hey {userName}! A <span style={{ color: 'green', fontWeight: 'bolder' }}>{work.workTitle}</span> is needed at our Location. Have a look at this work.
                        </Typography>
                      </Box>
                      {index !== notifications.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </DialogContent>

                <DialogActions>
                  {notifications.length > 0 && (
                    <Button onClick={handleMarkAllAsRead}>Mark all as read</Button>
                  )}
                  <Button onClick={handleDialogClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          </>)}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userName ? (
                  <Avatar alt={userName} src="/static/images/avatar/2.jpg" sx={{ bgcolor: getAvatarColor(userName[0]) }}>
                    {userName[0].toUpperCase()} {/* Convert first character to uppercase */}
                  </Avatar>
                ) : (
                  <Avatar sx={{ width: 40, height: 40 }}>
                    <AccountCircleIcon sx={{ fontSize: 24 }} /> {/* Adjusting the size of AccountCircleIcon */}
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userName ? ( // Conditional rendering based on userInfo
                <>
                  <MenuItem
                    component={Link}
                    to="/workpost"
                  >
                    <EditCalendarTwoToneIcon />
                    Create</MenuItem>
                  <MenuItem component={Link} to="/profile"> {/* Link to profile page */}
                    <AccountCircleIcon />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <LogoutIcon />
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login"> {/* Link to login page */}
                    <LoginIcon />
                    Login
                  </MenuItem>
                  <MenuItem component={Link} to="/signup"> {/* Link to signup page */}
                    <CreateIcon />
                    Sign Up
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
                 
  </>}
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Header;
