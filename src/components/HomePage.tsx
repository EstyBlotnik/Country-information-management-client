import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import '../style/HomePage.scss';

const HomePage: React.FC = () => {
  const userName = 'יוסי';

  return (
    <Container className="home-container">
      <Typography variant="h4" className="welcome-message">
        ברוכים הבאים, {userName}!
      </Typography>
      <div className="buttons-container">
        <Button variant="contained" color="primary" className="home-button">
          צפייה בכל המדינות
        </Button>
        <Button variant="contained" color="secondary" className="home-button">
          צפייה בכל הערים
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
