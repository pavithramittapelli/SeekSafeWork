import React from 'react'
import Header from './Header'
import { Grid, Typography, Avatar } from '@mui/material'
import created from './Images/created.png'
import bookmared from './Images/bookmarked.png'
import SSW from './Images/SSw.png'
import { UserContext } from './userContext'
// import { green, red, orange, pink, purple } from '@mui/material/colors';
import { Link } from 'react-router-dom'
import '../App.css'
import Footer from './Footer'
// const getAvatarColor = (char) => {
//     const colorMap = {
//         R: green[500],
//         S: red[500],
//         P: orange[500],
//         D: pink[500],
//         T: purple[500],
//         // Add more mappings as needed
//     };
//     return colorMap[char.toUpperCase()] || 'default';
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

function ProfilePage() {
    const { userInfo } = React.useContext(UserContext)
    const userName = userInfo?.userName;

    return (
        <div>
            <Header />
            {/* Welcome message */}
            <Typography variant='h5' sx={{ marginTop: '84px', textAlign: 'center', p: 10 }}>
                Welcome!!
            </Typography>


            <Grid container spacing={2} gap={10} sx={{ paddingLeft: '5%', paddingRight: '5%', marginBottom: '10%' }}>
                <Grid item xs={12} md={3} sx={{ backgroundColor: 'blue', color: 'white', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    {userInfo && (
                        <>
                            <Avatar alt={userName} src="/static/images/avatar/2.jpg" sx={{ bgcolor: getAvatarColor(userName[0]), width: 120, height: 120, fontSize: 70, }}>
                                {userName[0].toUpperCase()}
                            </Avatar>

                            <Typography variant='h4'>

                                {userName[0].toUpperCase() + userName.slice(1)}
                            </Typography>
                        </>)}
                </Grid>
                <Grid item xs={12} md={3} sx={{ backgroundColor: '#ffffff', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'black', borderBottom: '8px solid #fba61b' }} component={Link} Link to={'/myPosts'}>
                    <img src={created} style={{ width: '50%', maxWidth: '100%', }} alt='abc' />
                    <Typography sx={{ m: 2, }}>Created Posts</Typography>
                </Grid>
                <Grid item xs={12} md={3} sx={{ backgroundColor: '#ffffff', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'black', borderBottom: '8px solid blue' }} component={Link} Link to={'/myBookmarks'} >
                    <img src={bookmared} style={{ width: '50%', maxWidth: '100%' }} alt='def' />
                    <Typography sx={{ m: 2, }} >Bookmarked Posts</Typography>
                </Grid>
            </Grid>

            <div style={{ position: 'relative', marginTop: '50px', textAlign: 'center' }}>
                <div style={{ position: 'relative', filter: 'blur(10px)' }}>
                    <img src={SSW} style={{ width: '100%', height: 'auto' }} alt='SSW' />
                </div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>
                    <p style={{fontWeight:'bold' }}>
                        In a world where occupational hazards and uncertainties prevail, "SeekSafeWork" serves as a beacon for those navigating the job market. It fosters a community of employers and job seekers committed to upholding stringent safety standards and fostering environments conducive to well-being. By emphasizing the importance of safety alongside professional growth, it empowers individuals to make informed decisions about their career paths.
                    </p>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default ProfilePage;
