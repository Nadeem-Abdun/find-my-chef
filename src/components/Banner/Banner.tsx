import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useStyles, StylesProps } from '../../styles/common';
import { createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Image1 from '../../assets/BannerImg/Image1.png';
import Image2 from '../../assets/BannerImg/Image2.png';
import Image3 from '../../assets/BannerImg/Image3.png';

const Banner = () => {

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
    const isMd = useMediaQuery(theme.breakpoints.only('md'));

    const bannerImages = [Image1, Image2, Image3];

    return (
        <div style={{ width: '100%', height: '70vh', overflow: 'hidden' }}>
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
                {bannerImages.map((image, index) => (
                    <div key={index} style={{ height: '100vh', width: '100%' }}>
                        <img src={image} alt={`Banner ${index + 1}`} style={{ height: '100%', width: '100%', objectFit: 'fill' }} />
                        <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', }}>
                            <Typography component={(isXs || isSm) ? 'div' : 'span'} variant={(isXs) ? "h3" : (isSm || isMd) ? "h2" : "h1"} noWrap={(isXs) ? false : true} fontWeight='bold' fontFamily='Fira Sans' className={commonStyles.bannerText}>
                                Find My Chef
                            </Typography>
                            <br />
                            <Typography component={(isXs || isSm) ? 'div' : 'span'} variant={(isXs) ? "h6" : (isSm || isMd) ? "h5" : "h4"} noWrap={(isXs || isSm) ? false : true} fontWeight='bold' fontFamily='Fira Sans' className={commonStyles.bannerText}>
                                Your ultimate destination for connecting aspiring chefs with their desired positions.
                            </Typography>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
