export const oktaConfig = {
  clientId: `0oa88dw8nad1bCm9o5d7`,
  issuer: `https://dev-21034974.okta.com/oauth2/default`,
  redirectUri: `http://localhost:3000/login/callback`, // this makes it so redirects to login if not logged in for secure routes
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
  features: {
    idpDiscovery: true
  },
  idps: [
    {
      type: "GOOGLE",
      id: "0oa8es81xsZQPHBlj5d7	",
    },
  ],
  idpDisplay: "SECONDARY",
};
