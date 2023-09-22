import React from 'react';
import { Grid, Typography } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner';
import ChefCategory from '../../components/CategoriesList/ChefCategory';

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <Grid container justifyContent="center" alignItems='center' spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Banner />
        </Grid>
        <Grid item xs={12} sm={10} md={9}>
          <Typography variant='h4' fontWeight='bold'>Welcome to the Home Page</Typography>
          <Typography variant='body1'>This is the content of the Home page.</Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9}>
          <ChefCategory />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Home;
