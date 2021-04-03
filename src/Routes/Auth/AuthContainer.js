import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN, SIGN_UP, CONFIRM, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const secret = useInput("");
  const email = useInput("");
  const [requestSecretM] = useMutation(LOG_IN, {
    // update: (_, { data: { requestSecret } }) => {
    //   if (!requestSecret) {
    //     toast.error("You don't have account yet. create one.");
    //     setTimeout(() => setAction("signUp"), 2000);
    //   }
    // //update는 보통 client를 바꾸거나, cache를바꿀때 사용한다.
    // },
    variables: { email: email.value },
  });
  const [createAccountM] = useMutation(SIGN_UP, {
    // update: ({ data: { createAccount } }) => {
    //   if (!createAccount) {
    //     toast.error("You already have account. please check your password");
    //   }
    // },
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });
  const [confirmSecretM] = useMutation(CONFIRM, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });
  const [logUserInM] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretM();
          if (requestSecret) {
            toast.success("Secret is requested! please check your email");
            setAction("confirm");
          } else {
            toast.error("You don't have an account yet, create one.");
            setTimeout(() => setAction("signUp"), 2000);
          }
        } catch {
          toast.error("Can't request secret, Try again");
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (email.value && username.value && firstName.value && lastName.value) {
        try {
          const { data: createAccount } = await createAccountM();

          if (createAccount) {
            toast.success("Account created! Log In now");
          } else {
            toast.error("You are already sign up, please logIn");
          }
          setTimeout(() => setAction("logIn"), 2000);
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required");
      }
    } else if (action === "confirm") {
      if (email.value && secret.value) {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretM();
          if (token !== "" && token !== undefined) {
            logUserInM({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Wrong secret, Try again");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      secret={secret}
      email={email}
      onSubmit={onSubmit}
    />
  );
};
