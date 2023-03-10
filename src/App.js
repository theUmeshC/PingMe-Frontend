import { useCallback, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";

import { ColorContextProvider } from "./Store/themeContext";
import { oktaConfig } from "./Lib/oktaConfig";
import AddUser from "./Pages/AddUser";
import AddGroup from "./Pages/AddGroup";
import NavBar from "./Layout/NavBar";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";

const CALLBACK_PATH = "/login/callback";

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  const handleUser = useCallback((userInfo) => setUser(userInfo), []);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <>
        <Switch>
          <Route exact path="/">
            <Auth />
          </Route>
          <Route exact path={CALLBACK_PATH}>
            <LoginCallback />
          </Route>
          <ColorContextProvider>
            <NavBar user={user} />
            <SecureRoute path="/home" exact>
              <Home updateUser={handleUser} />
            </SecureRoute>
            <SecureRoute path="/addContact">
              <AddUser user={user} />
            </SecureRoute>
            <SecureRoute path="/addGroup">
              <AddGroup user={user}/>
            </SecureRoute>
          </ColorContextProvider>
        </Switch>
      </>
    </Security>
  );
}

export default App;
