import { Box, Container, Divider, Stack } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Discuss } from "react-loader-spinner";

import ChatBox from "../Layout/ChatBox";
import SideBar from "../Layout/SideBar";
import { SubContext } from "../Store/Context";
import { baseUrl } from "../Helper/useAxios";

let socket;

const Home = ({ updateUser }) => {
  const { messageBox } = SubContext();
  const { authState, oktaAuth } = useOktaAuth();
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket = io(`${baseUrl}`);
  }, []);

  useEffect(() => {
    dbUser && socket.emit("login", dbUser.user_id);
  }, [dbUser]);

  useEffect(() => {
    const getUser = async () => {
      if (!authState || !authState.isAuthenticated) {
        setUser(null);
      } else {
        oktaAuth.getUser().then((info) => {
          setUser(info);
        });
      }
    };
    getUser();
  }, [authState, oktaAuth]);

  useEffect(() => {
    const fetchData = () => {
      if (user) {
        const response = axios({
          method: "post",
          url: `${baseUrl}users/login`,
          headers: {
            Authorization: `Bearer ${authState.accessToken.accessToken}`,
            "Content-Type": "application/json",
          },
          data: {
            user,
          },
        });

        response.then((val) => {
          updateUser(val.data);
          setDbUser(val.data);
          localStorage.setItem("user", JSON.stringify(val.data));
          setLoading(false);
        });
      }
    };
    fetchData();
  }, [user, authState, updateUser]);

  return (
    <>
      {!loading && (
        <Box>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            height="90vh"
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ display: { sm: "none", xs: "flex" } }}
          >
            {messageBox === false ? (
              <SideBar user={dbUser} socket={socket} />
            ) : (
              <ChatBox user={dbUser} socket={socket} />
            )}
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            height="90vh"
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ display: { sm: "flex", xs: "none" } }}
          >
            <SideBar user={dbUser} socket={socket} />
            <ChatBox user={dbUser} socket={socket} />
          </Stack>
        </Box>
      )}
      {loading && (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: '80vh',
          }}
        >
          <Discuss
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#F4442E"
          />
        </Container>
      )}
    </>
  );
};

export default Home;
