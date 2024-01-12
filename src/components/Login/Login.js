import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import InputField from "../UI/Input/InputField";
import AuthContext from "../../contexts/auth-context";

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

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [email, dispachEmail] = useReducer(emailReducer, {
    value: "",
    isValidEmail: null,
  });

  const [password, dispachPassword] = useReducer(passwordReducer, {
    value: "",
    isValidPassword: null,
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(password.isValidPassword && email.isValidEmail);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [email.isValidEmail, password.isValidPassword]);

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
    authCtx.onLogin(email.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputField
          label={"Email"}
          isValid={email.isValidEmail}
          type={"text"}
          id={"email"}
          value={email.value}
          changeHandler={emailChangeHandler}
          blurHandler={validateEmailHandler}
        />
        <InputField
          label={"Password"}
          isValid={password.isValidPassword}
          type={"password"}
          id={"password"}
          value={password.value}
          changeHandler={passwordChangeHandler}
          blurHandler={validatePasswordHandler}
        />
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
