import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { v4 as uuidv4 } from "uuid";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const initialState = [];

const AlertState = (props) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type,timeout=5000) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  let value = {
    alerts:state,
    setAlert
  };

  return (
    <AlertContext.Provider value={value}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
