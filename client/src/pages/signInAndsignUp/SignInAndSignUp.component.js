import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import SignIn from "../../components/signIn/SignIn.component";
import SignUp from "../../components/signUp/SignUp.component";
import "./SignInAndSignUp.styles.scss";
import ForgotPassword from "../../components/forgot-password/ForgotPassword.component";

const SignInAndSignUp = props => {
  /* CREATE RELATIVE PATH FOR ROUTES */
  const { path } = useRouteMatch();
  return (
    <main className="signin-signup">
      <Route exact path={`${path}`} component={SignIn} />
      <Route path={`${path}/identity`} component={ForgotPassword} />
      <Route path={`${path}/signup`} component={SignUp} />
    </main>
  );
};

export default SignInAndSignUp;
