import {createContext, useContext, useState, useEffect} from "react";

const StateContext = createContext({
  token: null,
  notification: null,
  userID: null,
  userType: null,
  currentUserID: null,

  // setUser: () => {},
  setUserType: () => {},
  setToken: () => {},
  setNotification: () => {},
  setUserID:() => {},
  setCurrentUserID: () => {},
})

export const ContextProvider = ({children}) => {
  // const [user, setUser] = useState({});
  const [userType, setUserType] = useState(localStorage.getItem('USER_TYPE'));
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [currentUserID, setCurrentUserID] = useState(localStorage.getItem('USER_ID'));

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_ID');
      localStorage.removeItem('USER_TYPE');

    }
  }

  if(currentUserID){
    localStorage.setItem('USER_ID', currentUserID);
    localStorage.setItem('USER_TYPE', userType)
  }

  return (
    <StateContext.Provider value={{
      // user,
      // setUser,
      userType,
      setUserType,
      token,
      setToken,
      currentUserID,
      setCurrentUserID,
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
