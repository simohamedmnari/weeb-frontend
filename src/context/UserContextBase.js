import { createContext } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  loadingUser: true,
  logoutUser: () => {},
  isLoggedIn: false,
});

export default UserContext;
