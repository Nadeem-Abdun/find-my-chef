import React from 'react';
import { Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Contact: React.FC = () => {
  return (
    <div>
      <Header />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          {/* Content for the Home page */}
          <h1>Welcome to the Contact Page</h1>
          <p>This is the content of the Contact page.</p>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Contact;