import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStyles, StylesProps } from '../../styles/common';

// Images
import HeaderNavLogo from '../../assets/HeaderNavLogo.png';


const Header: React.FC = () => {

    const commonStyles = useStyles({} as StylesProps);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#8B4513' }}>
            <Toolbar>
                <div className={commonStyles.logoContainer}>
                    <img src={HeaderNavLogo} alt="Logo" className={commonStyles.logo} />
                </div>
                <div className={commonStyles.navLinks}>
                    <Typography variant="body1" component={Link} to="/" className={commonStyles.navLink}>
                        Home
                    </Typography>
                    <Typography variant="body1" component={Link} to="/about" className={commonStyles.navLink}>
                        About Us
                    </Typography>
                    <Typography variant="body1" component={Link} to="/contact" className={commonStyles.navLink}>
                        Contact Us
                    </Typography>
                </div>
            </Toolbar>
        </AppBar >
    );
};

export default Header;
