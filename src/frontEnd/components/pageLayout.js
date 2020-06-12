import React from "react";
import { Box, Container } from "@material-ui/core";

export default ({ children }) => {
  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Container component="main" maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center">
          {children}
        </Box>
      </Container>
    </Box>
  );
};
