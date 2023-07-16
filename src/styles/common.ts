import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export interface StylesProps {
    theme: Theme;
}

export const useStyles = makeStyles<Theme, StylesProps>(() => ({
    // Navbar Styless
    navLinks: {
        marginRight: theme.spacing(2),
        ...(theme.breakpoints.up('sm') && {
            marginRight: 0,
            marginLeft: theme.spacing(2),
        }),
    },
    navLink: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: '#8B4513',
        fontWeight: 600,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    logoContainer: {
        flexGrow: 1,
    },
    logo: {
        display: 'block',
        width: '100%',
        height: 'auto',
        ...(theme.breakpoints.up('sm') && {
            width: 80,
        }),
        ...(theme.breakpoints.up('lg') && {
            width: 120,
        }),
    },
    // Banner Styles
    bannerText: {
        color: '#8B4513',
        textShadow: '3px 3px #ffffff',
    },

    // Job Category
    jobCategoryItem: {
        marginBottom: '8px',
        textDecoration: 'none',
        color: '#28282B',
        fontWeight: 'bold',
        '&:hover': {
            color: '#000000',
        },
    },

    // Footer Styles
    footer: {
        backgroundColor: '#8B4513',
        color: theme.palette.common.white,
        padding: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    },
    Footerlogo: {
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    socialMediaIcon: {
        color: theme.palette.common.white,
    },
    footerBottom: {
        marginTop: theme.spacing(2),
    },
    backToTopButton: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
}));
