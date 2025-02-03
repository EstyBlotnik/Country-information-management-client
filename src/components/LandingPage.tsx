import React from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../style/LandingPage.scss";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Box className="landing-page">
      <Container className="landing-page__container">
        <Box className="landing-page__header">
          <Typography className="landing-page__title" variant="h3">
            ברוכים הבאים לעמוד המדינות שלנו
          </Typography>
          <Typography className="landing-page__description" variant="body1">
            כאן תוכל לקבל מידע על כל המדינות וערי הבירה שלהם.
          </Typography>
        </Box>

        <Box className="landing-page__buttons">
          <Button
            className="landing-page__button landing-page__button--register"
            onClick={handleRegister}
          >
            הרשמה
          </Button>

          <Button
            className="landing-page__button landing-page__button--login"
            onClick={handleLogin}
          >
            התחברות
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
