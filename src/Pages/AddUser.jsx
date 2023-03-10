import { AppBar, Avatar, Box, TextField, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import { v4 as uuidv4 } from "uuid";

import useAxios, { baseUrl } from "../Helper/useAxios";


const AddUsers = ({ user }) => {
  const { authState } = useOktaAuth();
  const userId = user.user_id;
  const {  data: users } = useAxios(
    `${baseUrl}chat/getAllUsers`,
    { userId }
  );

  const addFriendHandler = (id) => {
    if (userId && id) {
      const response = axios({
        method: "post",
        url: `${baseUrl}chat/addFriend`,
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          senderId: userId,
          receiverId: id,
        },
      });
      response.then(() => console.log("added user to friends"));
    }
  };

  return (
    <Box sx={{ height: "90vh" }}>
      <AppBar
        position="relative"
        sx={{
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          color: "text.primary",
          height: "10%",
        }}
      >
        <Stack
          direction="row"
          gap={2}
          sx={{
            color: "text.primary",
          }}
        >
          <Link to="/home">
            <ArrowBackIcon
              sx={{ display: { sm: "none", xs: "flex", cursor: "pointer" } }}
            />
          </Link>
          <Typography>Add Friends</Typography>
        </Stack>
        <TextField size="small" sx={{ width: "60%" }} />
      </AppBar>
      <Box sx={{ height: "90%", bgcolor: "background.default" }}>
        {users &&
          users.map((user) => (
            <Box
              key={uuidv4()}
              sx={{
                bgcolor: "background.selected",
                color: "text.primary",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                padding: "5px",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "background.hover",
                },
              }}
              onClick={() => {
                addFriendHandler(user.user_id);
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "background.hover",
                  color: "text.primary",
                  border: "1px solid ",
                }}
              >
                {`${user.firstname[0]}${user.lastname[0]}`}
              </Avatar>
              <Typography sx={{ textAlign: "center" }}>
                {user.username}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default AddUsers;
