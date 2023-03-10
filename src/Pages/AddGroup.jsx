import {
  Avatar,
  Box,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import useAxios, { baseUrl } from "../Helper/useAxios";

const AddGroup = ({ user }) => {
  const { authState } = useOktaAuth();
  const userId =
    user?.user_id || JSON.parse(localStorage.getItem("user")).user_id;
  const dbUser = JSON.parse(localStorage.getItem("user"));
  const [gParticipants, setGParticipants] = useState([dbUser]);
  const groupTitle = useRef();
  const { loading, data: users } = useAxios(
    `${baseUrl}chat/getAllUsers`,
    { userId }
  );

  const addParticipants = (individual) => {
    const indUid = individual.user_id;
    setGParticipants((prev) => {
      let part;
      const indPresent = prev.find(
        (item) => item.user_id === indUid
      );
      if (indPresent !== undefined) {
        part = prev.filter((item) => item.user_id !== indUid);
        return [...part];
      }
      return [...prev, individual];
    });
  };

  const handleAddGroup = () => {
    const groupName = groupTitle.current.value;
    if (groupName !== "" && gParticipants.length > 0) {
      axios({
        method: "post",
        url: `${baseUrl}chat/addToGroup`,
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          gParticipants,
          groupName,
        },
      });
    }
    setGParticipants([]);
    groupTitle.current.value = "";
  };

  return (
    loading && <div>loading...</div>,
    !loading && (
      <Box sx={{ height: "90vh", bgcolor: "background.default" }}>
        <Stack direction="column">
          {gParticipants.length > 0 ? (
            <Container>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "80%",
                  justifyContent: "center",
                  margin: "10px auto",
                }}
              >
                {gParticipants.map((participant) => (
                  <Avatar key={uuidv4()}>
                    {`${participant.firstname[0]}${participant.lastname[0]}`}
                  </Avatar>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <input
                  placeholder="Group name"
                  ref={groupTitle}
                  style= {{
                    height: '30px'
                  }}
                />
                <button
                  style={{
                    height: "30px",
                    padding: "0 10px",
                  }}
                  onClick={() => {
                    handleAddGroup();
                  }}
                >
                  Add to Group
                </button>
              </Box>
            </Container>
          ) : null}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "80%",
              margin: " 50px auto",
            }}
          >
            {users &&
              users.map((individual) => (
                <Card
                  key={uuidv4()}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 20px",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    addParticipants(individual);
                  }}
                >
                  <Avatar>
                    {`${individual.firstname[0]}${individual.lastname[0]}`}
                  </Avatar>
                  <Typography>{individual.username}</Typography>
                </Card>
              ))}
          </Box>
        </Stack>
      </Box>
    )
  );
};

export default AddGroup;
