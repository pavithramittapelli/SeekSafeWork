import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Footer() {
    const handleContactUsClick = () => {
        window.open('mailto:seeksafework@gmail.com', '_blank');
    };

    return (
        <footer style={{ width: '100%', marginTop: '20px', background: 'rgb(var(--color_15));', bottom: '0', padding: '20px', textAlign: 'center', backgroundColor: '#265073', color: 'white' }}>
            Seek Safe Work.<br />
            This is the website where you can find safe and secure work. <br/>
            <div style={{marginTop:'3%'}}>
            <Link to="/aboutus" style={{ textDecoration: 'none' }}>
                    <Button variant='contained' sx={{color:'black', borderColor:'white', bgcolor:'white'}}>
                        AboutUs
                    </Button>
                </Link>
                <Button variant='contained' sx={{color:'black', borderColor:'white', bgcolor:'white',marginLeft:'5%'}} onClick={handleContactUsClick}>
                    ContactUs
                </Button>
            </div>
        </footer>
    )
}

export default Footer;
