import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";

import Login from "../Components/Login";

const Auth = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/home" });
  const history = useHistory();

  if (!authState) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* <Box sx={{ height: "20%",width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>Celestial system</Typography>
        </Box> */}
        <Login handleLogin={login} />
      </Box>
    );
  } else {
    history.replace("/home");
    return "You authenticated";
  }
};

export default Auth;
