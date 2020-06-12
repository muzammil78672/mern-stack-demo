import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    width: 150,
    height: 150,
    border: "2px dashed #9b9b9b",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: "#f7f7f7",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    backgroundSize: "auto",
    marginBottom: theme.spacing(3),
  },
  imagePicker: {
    backgroundColor: theme.palette.secondary.main,
    display: "block",
    opacity: 0,
    borderRadius: "50%",
    position: "absolute",
    width: 150,
    height: 150,
    cursor: "pointer",
    zIndex: 2,
  },
}));

export default ({ updateImage, editable, profileImage }) => {
  const classes = useStyles();

  const handleProfileImage = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      updateImage(reader.result);
    };
  };

  return (
    <Box
      className={classes.imageContainer}
      style={{ backgroundImage: `url(${profileImage})` }}
    >
      {editable && (
        <input
          className={classes.imagePicker}
          name="profileImage"
          id="prodileImage"
          type="file"
          accept="image/*"
          onChange={handleProfileImage}
        />
      )}
    </Box>
  );
};
