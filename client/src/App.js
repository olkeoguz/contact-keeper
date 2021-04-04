import "./App.css";
import React, { useContext, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ContactState from "./context/contact/ContactState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import AuthContext from "./context/auth/authContext";
import classes from "./App.module.css";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);

  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    //eslint-disable-next-line
  }, []);

  let routes = (
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <ContactState>
      <AlertState>
        <>
          <Navbar />
          <div className={classes.Container}>
            <Alerts />
            {routes}
          </div>
        </>
      </AlertState>
    </ContactState>
  );
};

export default App;
