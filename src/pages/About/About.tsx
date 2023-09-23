import React from 'react';
import { Grid, Typography } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const About: React.FC = () => {
  return (
    <div>
      <Header />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant='h4' fontWeight='bold' color='#515666' fontFamily='Fira Sans' textAlign='center'>Welcome to the About Page</Typography>
          <Typography variant='body1' textAlign='center' fontFamily='Fira Sans'>The below is the content of About page.</Typography>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default About;
