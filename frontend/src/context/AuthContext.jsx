import { createContext, useContext, useEffect, useReducer } from 'react'

const initialState = {
  user: null,
  role: null,
  token: null
}

export const authContext = createContext(initialState);
// it will be used to share authentication state and function

// Provider
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };
    default:
      return state;
  }
}

// It is provider that wraps around our appplication and uses reducer hook for authentication
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <authContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
      {children}
    </authContext.Provider>
  )
}