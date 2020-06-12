import React, { useState, useEffect, Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";

import PageLayout from "../components/pageLayout";
import ProfileImage from "../components/profileImage";
import { getItem } from "../common/helper";
import { logout } from "../services/authService";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(10, 0, 2),
  },
}));

export default () => {
  const classes = useStyles();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = getItem("user");
    if (user && user.data) {
      setLoggedInUser(user.data);
    } else {
      Router.push("/login");
    }
  }, []);

  const logoutHandler = async (e) => {
    try {
      e.preventDefault();
      await logout();
      Router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout>
      {loggedInUser && (
        <Fragment>
          <ProfileImage
            profileImage={
              loggedInUser &&
              loggedInUser.profileImageMimeType +
                "," +
                loggedInUser.profileImage
            }
            editable={false}
          />
          <Typography component="h1" variant="h5">
            {"Hello, " + loggedInUser.fullName}
          </Typography>
        </Fragment>
      )}
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={logoutHandler}
        className={classes.submit}
      >
        sign out
      </Button>
    </PageLayout>
  );
};
