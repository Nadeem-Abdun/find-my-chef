import React from 'react';
import { Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner';
import JobCategory from '../../components/CategoriesList/JobCategory';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Grid container justifyContent="center" alignItems='center'>
        <Grid item xs={12} sm={12} md={12}>
          <Banner />
        </Grid>
        <Grid item xs={12} sm={10} md={9}>
          <h1>Welcome to the Home Page</h1>
          <p>This is the content of the Home page.</p>
        </Grid>
        <Grid item xs={12} sm={10} md={9}>
          <JobCategory />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Home;
