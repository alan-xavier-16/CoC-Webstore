import React from "react";
import SignIn from "../../components/signIn/SignIn.component";
import SignUp from "../../components/signUp/SignUp.component";
import "./SignInAndSignUp.styles.scss";

const SignInAndSignUp = props => {
  return (
    <main className="signin-signup">
      <SignIn />
      <SignUp />
    </main>
  );
};

export default SignInAndSignUp;
