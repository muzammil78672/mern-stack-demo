import React, { useEffect } from "react";
import { Typography, Grid, Link, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import Router from "next/router";

import { LoginFormSchema } from "../common/validations";
import PageLayout from "../components/pageLayout";
import { login, logout } from "../services/authService";
import { getItem } from "../common/helper";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const InitialValues = {
  email: "",
  password: "",
};

export default () => {
  const classes = useStyles();

  const submitFormHandler = async (data, resetForm) => {
    try {
      let response = await login(data);
      if (response) {
        resetForm(InitialValues);
        Router.push("/");
      }
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
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        initialValues={InitialValues}
        validationSchema={LoginFormSchema}
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
        }) => (
          <Form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid
              container
              alignItems="flex-end"
              justify="flex-end"
              direction="row"
            >
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};
