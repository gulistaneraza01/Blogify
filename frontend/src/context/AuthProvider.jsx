import { createContext, useContext, useReducer } from "react";

const authContext = createContext();

function reducer(auth, action) {
  switch (action.type) {
    case "ADDINITIAL": {
      return [action.payload.state];
    }
    case "REMOVEINITIAL": {
      return null;
    }
  }
  return auth;
}

const initialState = null;

function AuthProvider({ children }) {
  const [auth, dispatch] = useReducer(reducer, initialState);
  const addInitial = (state) => {
    dispatch({ type: "ADDINITIAL", payload: { state } });
  };
  const removeInitial = () => {
    dispatch({ type: "REMOVEINITIAL" });
  };
  return (
    <authContext.Provider value={{ auth, addInitial, removeInitial }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
