import React from "react";
import { useReducer } from "react";

export const AuthContext = React.createContext();

const initialState = {
  isLogin: false,
  consumer_or_not: undefined,
  email: "",
  id: "",
  phone_number: "",
  real_name: "",
  resident_registration_number: "",
  wallet_address: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isLogin: action.payload,
        id: action.id,
        real_name: action.real_name,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "SAVE_ADDRESS":
      return {
        ...state,
        wallet_address: action.address,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
