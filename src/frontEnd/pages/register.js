import React, { Fragment, useEffect } from "react";
import { Typography, Grid, Link, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import Router from "next/router";

import { RegisterFormSchema } from "../common/validations";
import PageLayout from "../components/pageLayout";
import ProfileImage from "../components/profileImage";
import { register, logout } from "../services/authService";
import { getItem } from "../common/helper";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const InitialValues = {
  fullName: "",
  dob: new Date().toLocaleDateString().split("/").reverse().join("-"),
  password: "",
  profileImage: "",
  email: "",
};

export default () => {
  const classes = useStyles();

  const submitFormHandler = async (data, resetForm) => {
    try {
      await register(data);
      resetForm(InitialValues);
      Router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = getItem("user");
    if (user && user.data) {
      logout();
    }
  }, []);

  return (
    <PageLayout>
      <Formik
        initialValues={InitialValues}
        validationSchema={RegisterFormSchema}
        onSubmit={(values, { resetForm }) => {
          submitFormHandler(values, resetForm);
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Fragment>
            <ProfileImage
              profileImage={values.profileImage}
              editable={true}
              updateImage={(data) => setFieldValue("profileImage", data)}
            />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.fullName && touched.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    name="fullName"
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.dob && touched.dob}
                    id="date"
                    label="Date of Birth"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dob}
                    name="dob"
                    variant="outlined"
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email && touched.email}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && touched.password}
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Fragment>
        )}
      </Formik>
    </PageLayout>
  );
};
