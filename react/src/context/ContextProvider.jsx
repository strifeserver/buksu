import {createContext, useContext, useState, useEffect} from "react";

const StateContext = createContext({
  token: null,
  notification: null,
  userID: null,
  currentUserID: null,

  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setUserID:() => {},
  setCurrentUserID: () => {},
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [currentUserID, setCurrentUserID] = useState(localStorage.getItem('USER_ID'));

  const [notification, _setNotification] = useState('');

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_ID');

    }
  }

  if(currentUserID){
    localStorage.setItem('USER_ID', currentUserID);
  }

  const setNotification = message => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      currentUserID,
      setCurrentUserID,
      notification,
      setNotification,
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);

// const StateContext = createContext({
//   currentUser: null,
//   token: null,
//   notification: null,
//   userID: null,
//   name1: null,

//   setUser: (user) => {},
//   setToken: (token) => {},
//   setNotification: (message) => {},

//   setName1: (name1) => {},


//   setUserID:() => {},



// })

// export const ContextProvider = ({children}) => {
//   const [user, setUser] = useState({});
//   const [userID, setUserID] = useState({});
//   const [name1 , setName1] = useState({});
//   const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
//   const [notification, _setNotification] = useState('');

//   const setToken = (token) => {
//     _setToken(token)
//     if (token) {
//       localStorage.setItem('ACCESS_TOKEN', token);
//     } else {
//       localStorage.removeItem('ACCESS_TOKEN');
//     }
//   }

//   const setNotification = message => {
//     _setNotification(message);

//     setTimeout(() => {
//       _setNotification('')
//     }, 5000)
//   }

//   return (
//     <StateContext.Provider value={{
//       user,
//       setUser,
//       userID,
//       setUserID,
//       token,
//       setToken,
//       notification,
//       setNotification,
//       name1,
//       setName1,
//     }}>
//       {children}
//     </StateContext.Provider>
//   );
// }

// export const useStateContext = () => useContext(StateContext);
