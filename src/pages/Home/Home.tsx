import React from 'react';
import { Grid, Typography } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner';
import ChefCategory from '../../components/CategoriesList/ChefCategory';
import PlatformDemo from '../../components/PlatformDemo/PlatformDemo';

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <Grid container justifyContent="center" alignItems='center' spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Banner />
        </Grid>
        <Grid item xs={12} sm={10} md={11}>
          <Typography variant='h4' fontWeight='bold' color='#515666' fontFamily='Fira Sans' textAlign='center'>Welcome to the Home Page</Typography>
          <Typography variant='body1' textAlign='center' fontFamily='Fira Sans'>The below is the content of Home page.</Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={11}>
          <PlatformDemo />
        </Grid>
        <Grid item xs={12} sm={10} md={11}>
          <ChefCategory />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Home;
