import React from 'react';
import { Typography, Grid, IconButton, Link } from '@mui/material';
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
                        <Typography variant="h6" fontWeight='bold'>
                            Find My Chef Solutions Pvt. Ltd.
                        </Typography>
                        <Typography variant="body2">
                            A dedicated platform connecting job seekers with opportunities in the restaurant, hotel, cloud kitchen, cafe, and food outlet industry, making it easy for both job seekers and owners to find the perfect match.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight='bold'>
                            Quick Links
                        </Typography>
                        <Typography variant="body2">
                            <li><Link fontWeight='bold' color='#ffffff' href='/find-my-chef/'>Home</Link></li>
                            <li><Link fontWeight='bold' color='#ffffff' href='/find-my-chef/about'>About Us</Link></li>
                            <li><Link fontWeight='bold' color='#ffffff' href='/find-my-chef/about'>Services</Link></li>
                            <li><Link fontWeight='bold' color='#ffffff' href='/find-my-chef/contact'>Contact</Link></li>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight='bold'>
                            Contact Us
                        </Typography>
                        <Typography variant="body2">
                            Address: 123 Main Street, City
                            <br />
                            Email: info@example.com
                            <br />
                            Phone: (123) 456-7890
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight='bold'>
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
                        <Typography variant="body2">
                            &copy; Find My Chef 2023, All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size='large' color='primary' onClick={handleBackToTop}>
                            <KeyboardArrowUp />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
