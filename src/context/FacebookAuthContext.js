import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import initFacebookSDK from "../utils/initFacebookSDK";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return { ...state, isAuthenticated, isInitialized: true, user };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return { ...state, isAuthenticated: true, user };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const FacebookAuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

FacebookAuthProvider.propTypes = {
  children: PropTypes.node,
};

function FacebookAuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initFacebookSDK();
        const loginStatus = await FBgetLoginStatus();

        const isAuthenticated = loginStatus.status === "connected";

        const user = await FBgetUser()

        if (isAuthenticated) {

          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated, user },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    initialize();
  }, []);

  const login = async () => {
    try {
      const loginStatus = await FBlogin();
      const user = await FBgetUser();
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await FBlogout();
      dispatch({
        type: "LOGOUT",
      });
    } catch (error) {}
  };



  function FBlogin() {
    return new Promise((resolve, reject) => {
      window.FB.login((response) => {
        console.log(response);
        resolve(response);
      });
    });
  }

  function FBgetLoginStatus() {
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus((response) => {
        resolve(response);
      });
    });
  }

  function FBgetUser(){
    return new Promise((resolve)=>{
        window.FB.api("/me",(response)=>{
            resolve(response)
        })
    })
  }

  function FBlogout(){
    return new Promise((resolve, reject) => {
        window.FB.logout((response) => {
          console.log(response);
          resolve(response);
        });
      });
  }

  return (
    <FacebookAuthContext.Provider
      value={{
        ...state,
        user: {
          id: state?.user?.id,
          name : state?.user?.name
        },
        login,
        logout
      }}
    >
      {children}
    </FacebookAuthContext.Provider>
  );
}

export { FacebookAuthContext, FacebookAuthProvider };
