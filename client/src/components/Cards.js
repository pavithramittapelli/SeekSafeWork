import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Grid } from '@mui/material';
import eyecare from './Images/eyecare.jpg'
import childcare from './Images/childcare.webp'
import kidneycare from './Images/kidn.png'
import lungcare from './Images/lungs.png'
import dentist from './Images/dentist.png'
function Cards() {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{
                margin: 'auto',
            }}
        >
            <Card sx={{ maxWidth: 150, padding: '20px', m:2}}>
                <CardMedia
                    component="img"
                    src={childcare}
                    alt="Hospital"
                    height="120" // Decrease the height
                    width="120" // Decrease the width
                />
                <Typography variant='h6' padding={'5px 0px'} textAlign='center'>
                    ChildCare
                </Typography>
            </Card>
            <Card sx={{ maxWidth: 150, padding: '20px', m:2}}>
                <CardMedia
                    component="img"
                    src={kidneycare}
                    alt="Hospital"
                    height="120" // Decrease the height
                    width="120" // Decrease the width
                />
                <Typography variant='h6' padding={'5px 0px'} textAlign='center'>
                    Nephrology
                </Typography>
            </Card>
            <Card sx={{ maxWidth: 150, padding: '20px' ,m:2}}>
                <CardMedia
                    component="img"
                    src={eyecare}
                    alt="Hospital"
                    height="100" // Decrease the height
                    width="100" // Decrease the width

                />
                <Typography variant='h6' padding={'5px 0px'} textAlign='center' sx={{ marginTop: '20px' }}>
                    EyeCare
                </Typography>
            </Card>
            <Card sx={{ maxWidth: 150, padding: '20px',m:2 }}>
                <CardMedia
                    component="img"
                    src={lungcare}
                    alt="Hospital"
                    height="120" // Decrease the height
                    width="120" // Decrease the width
                />
                <Typography variant='h6' padding={'5px 0px'} textAlign='center'>
                    Pulmonology
                </Typography>
            </Card>
            <Card sx={{ maxWidth: 150, padding: '20px',m:2 }}>
                <CardMedia
                    component="img"
                    src={dentist}
                    alt="Hospital"
                    height="120" // Decrease the height
                    width="120" // Decrease the width
                />
                <Typography variant='h6' padding={'5px 0px'} textAlign='center'>
                    Dentist
                </Typography>
            </Card>
        </Grid>
    );
}

export default Cards
