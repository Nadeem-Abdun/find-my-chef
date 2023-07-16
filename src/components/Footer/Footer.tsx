import React from 'react';
import { Typography, Grid, IconButton } from '@mui/material';
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
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" className={commonStyles.Footerlogo}>
                        Your Company Name
                    </Typography>
                    <Typography variant="body2">
                        Exclusive job portal for job seekers and owners of Restaurants/Hotels/cloud kitchens/cafe's/Food Outlets etc. which has become a platform to find the right jobs for job seekers and relevant candidates for owners effortlessly.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" className={commonStyles.sectionTitle}>
                        Quick Links
                    </Typography>
                    <Typography variant="body2">
                        <ul>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Services</li>
                            <li>Contact</li>
                        </ul>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" className={commonStyles.sectionTitle}>
                        Contact Us
                    </Typography>
                    <Typography variant="body2">
                        <p>Address: 123 Main Street, City</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" className={commonStyles.sectionTitle}>
                        Follow Us
                    </Typography>
                    <IconButton
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener"
                    >
                        <Facebook className={commonStyles.socialMediaIcon} />
                    </IconButton>
                    <IconButton
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener"
                    >
                        <Twitter className={commonStyles.socialMediaIcon} />
                    </IconButton>
                    <IconButton
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
        </footer>
    );
};

export default Footer;
