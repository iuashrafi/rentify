import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios
        .get(`/api/profile`)
        .then(({ data }) => {
          // alert(JSON.stringify(data, 2, null));
          setUser(data);
          setReady(true);
        })
        .catch((error) => {
          console.error("ERROR fetching User Context, Error= ", error);
        });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
