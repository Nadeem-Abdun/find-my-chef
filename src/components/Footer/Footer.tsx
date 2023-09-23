import React from 'react';
import { Typography, Grid, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, KeyboardArrowUp } from '@mui/icons-material';
import { useStyles, StylesProps } from '../../styles/common';


const Footer: React.FC = () => {
    const commonStyles = useStyles({} as StylesProps);

    // Footer back to top button
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={commonStyles.footer}>
            <Grid container>
                <Grid container spacing={4} justifyContent="center" alignItems='flex-start'>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight='bold' fontFamily='Fira Sans'>
                            Find My Chef Solutions Pvt. Ltd.
                        </Typography>
                        <Typography variant="body2" fontFamily='Fira Sans'>
                            A dedicated platform connecting job seekers with opportunities in the restaurant, hotel, cloud kitchen, cafe, and food outlet industry, making it easy for both job seekers and owners to find the perfect match.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight='bold' fontFamily='Fira Sans'>
                            Quick Links
                        </Typography>
                        <Typography variant="body2" fontFamily='Fira Sans'>
                            <li><Typography variant="body2" fontWeight='bold' component={Link} to="/" fontFamily='Fira Sans' color='#ffffff'>Home</Typography></li>
                            <li><Typography variant="body2" fontWeight='bold' component={Link} to="/about" fontFamily='Fira Sans' color='#ffffff'>About Us</Typography></li>
                            <li><Typography variant="body2" fontWeight='bold' component={Link} to="/about" fontFamily='Fira Sans' color='#ffffff'>Services</Typography></li>
                            <li><Typography variant="body2" fontWeight='bold' component={Link} to="/contact" fontFamily='Fira Sans' color='#ffffff'>Contact Us</Typography></li>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight='bold' fontFamily='Fira Sans'>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" fontFamily='Fira Sans'>
                            Address: 123 Main Street, City
                            <br />
                            Email: info@example.com
                            <br />
                            Phone: (123) 456-7890
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight='bold' fontFamily='Fira Sans'>
                            Follow Us
                        </Typography>
                        <IconButton
                            size='small'
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener"
                        >
                            <Facebook className={commonStyles.socialMediaIcon} />
                        </IconButton>
                        <IconButton
                            size='small'
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener"
                        >
                            <Twitter className={commonStyles.socialMediaIcon} />
                        </IconButton>
                        <IconButton
                            size='small'
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener"
                        >
                            <Instagram className={commonStyles.socialMediaIcon} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" className={commonStyles.footerBottom}>
                    <Grid item>
                        <Typography variant="body2" fontFamily='Fira Sans'>
                            &copy; Find My Chef 2023, All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size='large' color='primary' onClick={() => { handleBackToTop() }}>
                            <KeyboardArrowUp />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
