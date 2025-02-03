import React from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUser } from "../hooks/useUser";
import "../style/signupForm.scss";
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^(\d{10})$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  profilePicture: Yup.mixed().nullable(),
});

const SignupForm = () => {
  const { registerUser } = useUser();
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("profilePicture", file);
    }
  };
  const handleSubmit = (values: any) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "profilePicture" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });

    registerUser(formData as any);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profilePicture: null,
        userName: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box className="landing-page__box">
            <h2 className="landing-page__title">Sign Up</h2>
            <p className="landing-page__description">
              Please fill in your details to create an account
            </p>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  name="firstName"
                  as={TextField}
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="firstName" />}
                  error={Boolean(<ErrorMessage name="firstName" />)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  name="lastName"
                  as={TextField}
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="lastName" />}
                  error={Boolean(<ErrorMessage name="lastName" />)}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="email" />}
                  error={Boolean(<ErrorMessage name="email" />)}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="phoneNumber"
                  as={TextField}
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="phoneNumber" />}
                  error={Boolean(<ErrorMessage name="phoneNumber" />)}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="userName"
                  as={TextField}
                  label="Username"
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="userName" />}
                  error={Boolean(<ErrorMessage name="userName" />)}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  helperText={<ErrorMessage name="password" />}
                  error={Boolean(<ErrorMessage name="password" />)}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
                <ErrorMessage
                  name="profilePicture"
                  component="div"
                  className="error-message"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              className="landing-page__button"
            >
              Sign Up
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
