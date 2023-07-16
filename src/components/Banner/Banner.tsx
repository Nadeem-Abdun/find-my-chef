import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useStyles, StylesProps } from '../../styles/common';
import Image1 from '../../assets/BannerImg/Image1.png';
import Image2 from '../../assets/BannerImg/Image2.png';
import Image3 from '../../assets/BannerImg/Image3.png';

const Banner = () => {
    const commonStyles = useStyles({} as StylesProps);
    const bannerImages = [Image1, Image2, Image3];

    return (
        <div style={{ width: '100%', height: '70vh', overflow: 'hidden' }}>
            <div style={{ width: '100%' }}>
                <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
                    {bannerImages.map((image, index) => (
                        <div key={index} style={{ height: '100vh', width: '100%' }}>
                            <img src={image} alt={`Banner ${index + 1}`} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                    color: '#fff',
                                }}
                            >
                                <Grid>
                                    <Typography variant="h1" className={commonStyles.bannerText}>Find My Chef</Typography>
                                    <Typography variant="h4" noWrap className={commonStyles.bannerText}>
                                        Your ultimate destination for connecting aspiring chefs with their desired positions.
                                    </Typography>
                                </Grid>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Banner;
