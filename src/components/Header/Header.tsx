import React from 'react';
import { AppBar, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useStyles, StylesProps } from '../../styles/common';
import { NavPaddingX } from './Header.style'

// Images
import HeaderNavLogo from '../../assets/HeaderNavLogo.png';


const Header: React.FC = () => {

    const commonStyles = useStyles({} as StylesProps);

    // Resposiveness Breakpoints
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },
    });
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));

    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#8B4513' }}>
            <NavPaddingX>
                <Grid container justifyContent='space-between' alignItems='center' wrap='nowrap'>
                    <Grid item xs='auto'>
                        <img src={HeaderNavLogo} alt="Logo" className={commonStyles.logo} />
                    </Grid>
                    <Grid item>
                        <Grid container spacing={(isXs || isSm) ? 1 : 2} justifyContent={(isXs || isSm) ? 'flex-end' : 'flex-start'} wrap={(isXs || isSm) ? 'wrap' : 'nowrap'}>
                            <Grid item>
                                <Typography variant="h6" fontWeight='bold' component={Link} to="/" className={commonStyles.navLink}>Home</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" fontWeight='bold' component={Link} to="/about" className={commonStyles.navLink}>About Us</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" fontWeight='bold' component={Link} to="/contact" className={commonStyles.navLink}>Contact Us</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </NavPaddingX>
        </AppBar >
    );
};

export default Header;
