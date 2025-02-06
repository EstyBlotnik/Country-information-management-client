import React from "react";
import { TextField, Button, Grid, Box, Avatar } from "@mui/material";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
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
  profilePicture: Yup.mixed().nullable(),
});

const EditUserForm = () => {
  const { user, updateUser } = useUser();
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
    console.log("values:", values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "profilePicture" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });
    console.log("formData: ");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    user?._id && updateUser({ userId: user._id, updatedData: formData as any });
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <Formik
      initialValues={{
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        profilePicture: null,
        userName: user?.userName || "",
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
            <Grid item xs={12} container justifyContent="center">
              <Avatar
                src={
                  `http://localhost:4000${user.profilePicture}` ||
                  "/default-avatar.png"
                }
                alt={user.userName}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, setFieldValue)}
              />
              <label htmlFor="profilePicture">
                <Button variant="contained" component="span">
                  Change profile picture
                </Button>
              </label>
              <ErrorMessage
                name="profilePicture"
                component="div"
                className="error-message"
              />
            </Grid>
            {/* <Grid item xs={12}>
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
            </Grid> */}
            <h2 className="landing-page__title">Edit Profile</h2>
            <p className="landing-page__description">
              You can edit your personal details here.{" "}
            </p>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field name="firstName">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12} md={6}>
                <Field name="lastName">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Email Address"
                      fullWidth
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Field name="phoneNumber">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Field name="userName">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="User Name"
                      fullWidth
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
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
              Save changes
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserForm;
