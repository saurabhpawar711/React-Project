import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  // setFormIsValid(
  //   enteredPassword.trim().length > 6 &&
  //     enteredCollege.trim().length > 0 &&
  //     enteredEmail.includes("@")
  // );
  //   }, 500);

  //   return () => {
  //     clearTimeout(identifier);
  //   };
  // }, [enteredCollege, enteredEmail, enteredPassword]);

  const emailReducer = (state, action) => {
    if (action.type === "USER_EMAIL") {
      return { value: action.val, isValidEmail: action.val.includes("@") };
    } else if (action.type === "EMAIL_VALIDATE") {
      return { value: state.value, isValidEmail: state.value.includes("@") };
    }
    return { value: "", isValidEmail: false };
  };

  const passwordReducer = (state, action) => {
    if (action.type === "USER_PASSWORD") {
      return { value: action.val, isValidPassword: action.val.length > 6 };
    } else if (action.type === "PASSWORD_VALIDATE") {
      return { value: state.value, isValidPassword: state.value.length > 6 };
    }
    return { value: "", isValidPassword: false };
  };

  const [email, dispachEmail] = useReducer(emailReducer, {
    value: "",
    isValidEmail: null,
  });

  const [password, dispachPassword] = useReducer(passwordReducer, {
    value: "",
    isValidPassword: null,
  });

  const emailChangeHandler = (event) => {
    dispachEmail({ type: "USER_EMAIL", val: event.target.value });

    setFormIsValid(
      password.value.trim().length > 6 && event.target.value.includes("@")
    );
  };

  const passwordChangeHandler = (event) => {
    dispachPassword({ type: "USER_PASSWORD", val: event.target.value });

    setFormIsValid(
      event.target.value.trim().length > 6 && email.value.includes("@")
    );
  };

  const validateEmailHandler = () => {
    dispachEmail({ type: "EMAIL_VALIDATE" });
  };

  const validatePasswordHandler = () => {
    dispachPassword({ type: "PASSWORD_VALIDATE" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("isLoggedIn", "1");
    props.onLogin(email.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            email.isValidEmail === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            password.isValidPassword === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
