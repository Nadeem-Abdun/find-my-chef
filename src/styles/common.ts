import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export interface StylesProps {
    theme: Theme;
}

export const useStyles = makeStyles<Theme, StylesProps>(() => ({

    // Navbar Styles
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
        color: '#8b0d32',
        fontWeight: 700,
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(3px)',
        padding: '2px',
        color: '#8b0d32',
        textShadow: '2px 2px #ffffff',
    },

    // Job Category
    jobCategoryItem: {
        marginBottom: '8px',
        fontFamily: 'Fira Sans',
        textDecoration: 'none',
        color: '#28282B',
        fontWeight: '600',
        '&:hover': {
            color: '#000000',
        },
    },

    // Platform Demo
    PlatformCardShadow: {
        '&.css-bhp9pd-MuiPaper-root-MuiCard-root': {
            boxShadow: '0 0 30px rgba(139, 13, 50, 0.5)',
        }
    },

    PlatformCardTopBottomMarginXs: {
        '&.MuiGrid-root': {
            [theme.breakpoints.down('sm')]: {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
            },
        }
    },

    // Footer Styles
    footer: {
        backgroundColor: '#8b0d32',
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
        '&:hover': {
            color: '#1877f2',
        },
    },
    footerBottom: {
        marginTop: theme.spacing(2),
    },
    backToTopButton: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
}));
