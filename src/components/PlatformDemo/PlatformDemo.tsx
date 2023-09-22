import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { StyledCard } from '../PlatformDemo/PlatformDemo.style'
import { useStyles, StylesProps } from '../../styles/common';
import { createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import CloudIdea from '../../assets/PlatformDemoImg/cloud-idea.png'
import FormPic from '../../assets/PlatformDemoImg/form.png'
import RingerVol from '../../assets/PlatformDemoImg/ringer-volume.png'
import HandShake from '../../assets/PlatformDemoImg/handshake.png'

const PlatformDemo = () => {

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

    return (
        <>
            <Grid container lg={12} xs={12} justifyContent='center' alignItems='center' spacing={isXs ? 0 : 2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight='bold' textAlign='center' color='#515666' fontFamily='Fira Sans'>
                        Our Platform in Action
                    </Typography>
                </Grid>
                <Grid container xs={12} item justifyContent={isXs ? 'center' : 'space-between'} alignItems='center' spacing={1}>
                    <Grid item xl={2} lg={3} md={3} sm={6} xs={11} className={commonStyles.PlatformCardTopBottomMarginXs}>
                        <StyledCard className={commonStyles.PlatformCardShadow}>
                            <Grid container justifyContent='center' alignItems='flex-start' spacing={1}>
                                <Grid container item xs={12} justifyContent='center' alignItems='center'>
                                    <Grid item>
                                        <img src={CloudIdea} alt='KnowYourNeedImg' />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight='bold' textAlign='center' color='#515666' fontFamily='Fira Sans'>KNOW YOUR NEED</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" textAlign='center' fontFamily='Fira Sans'>Our work starts with understanding your needs. Whether you're a client searching for a chef or vice versa.</Typography>
                                </Grid>
                            </Grid>
                        </StyledCard>
                    </Grid>

                    <Grid item xl={2} lg={3} md={3} sm={6} xs={11} className={commonStyles.PlatformCardTopBottomMarginXs}>
                        <StyledCard className={commonStyles.PlatformCardShadow}>
                            <Grid container justifyContent='center' alignItems='flex-start' spacing={1}>
                                <Grid container item xs={12} justifyContent='center' alignItems='center'>
                                    <Grid item>
                                        <img src={FormPic} alt='FormPicImg' />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight='bold' textAlign='center' color='#515666' fontFamily='Fira Sans'>POST YOUR REQUIREMENT</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" textAlign='center' fontFamily='Fira Sans'>Fill out a simple form to publish your ad on our portal.</Typography>
                                </Grid>
                            </Grid>
                        </StyledCard>
                    </Grid>

                    <Grid item xl={2} lg={3} md={3} sm={6} xs={11} className={commonStyles.PlatformCardTopBottomMarginXs}>
                        <StyledCard className={commonStyles.PlatformCardShadow}>
                            <Grid container justifyContent='center' alignItems='flex-start' spacing={1}>
                                <Grid container item xs={12} justifyContent='center' alignItems='center'>
                                    <Grid item>
                                        <img src={RingerVol} alt='RingerVolImg' />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight='bold' textAlign='center' color='#515666' fontFamily='Fira Sans'>HOW CANDIDATES CALL YOU</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" textAlign='center' fontFamily='Fira Sans'>Your requirement reaches active job seekers who are screeened by us.</Typography>
                                </Grid>
                            </Grid>
                        </StyledCard>
                    </Grid>

                    <Grid item xl={2} lg={3} md={3} sm={6} xs={11} className={commonStyles.PlatformCardTopBottomMarginXs}>
                        <StyledCard className={commonStyles.PlatformCardShadow}>
                            <Grid container justifyContent='center' alignItems='flex-start' spacing={1}>
                                <Grid container item xs={12} justifyContent='center' alignItems='center'>
                                    <Grid item>
                                        <img src={HandShake} alt='HandShakeImg' />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight='bold' textAlign='center' color='#515666' fontFamily='Fira Sans'>FINALIZE CANDIDATES</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" textAlign='center' fontFamily='Fira Sans'>After the calls you get, choose better people & hire.</Typography>
                                </Grid>
                            </Grid>
                        </StyledCard>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default PlatformDemo