import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

const AuthState = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User

  const loadUser = async () => {
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth"); // gets the logged in user
      dispatch({ type: USER_LOADED, payload: res.data }); //res.data = user
    } catch (error) {
      dispatch({ type:AUTH_ERROR});
    }
  };

  //Register User

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data }); // res.data = token
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  //Login User

  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    try {
      const res = await axios.post('api/auth',formData,config);
      dispatch({ type:LOGIN_SUCCESS,payload: res.data}) //res.data = token
      loadUser();
    } catch (error) {
      dispatch({ type:LOGIN_FAIL,payload: error.response.data.msg});
    }
  }

  //Logout

  const logout = () => {
    dispatch({type:LOGOUT});
  }

  //Clear Errors

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  let value = {
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    user: state.user,
    error: state.error,
    register,
    clearErrors,
    loadUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthState;
