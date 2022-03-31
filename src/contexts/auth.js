import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [user, setUser] = React.useState(null);

  return {
    user,
    login(u) {
      return new Promise((res) => {
        setUser(u);
        res();
      });
    },
    logout() {
      return new Promise(async (res) => {
        await fetch('/api/logout');
        setUser(null);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
