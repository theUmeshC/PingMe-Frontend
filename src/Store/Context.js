import React, { createContext, useContext, useMemo, useState } from "react";

const Context = createContext({
  messageBox: false,
  messageBoxHandler: () => {},
});

export const ContextProvider = ({ children }) => {
  const [messageBox, setMessageBox] = useState(false);

  const [friend, setFriend] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const contextValue = useMemo(
    () => ({
      messageBox,
      friend,
      currentUser,
      messageBoxHandler: () => setMessageBox((prevState) => !prevState),
      friendHandler: (user) => setFriend(user),
      userHandler: (user) => setCurrentUser(user),
    }),
    [messageBox, friend, currentUser]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Context;

export const SubContext = () => useContext(Context);
