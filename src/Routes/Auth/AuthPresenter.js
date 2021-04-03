import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";

const Wrapper = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius: 0px;
  width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 20px 40px;
  margin-bottom: 12px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(last-child) {
        margin-bottom: 5px;
      }
    }
  }
`;

const InputBox = styled.div`
  margin-bottom: 15px;
`;

const EButton = styled.button`
  background-color: ${(props) => props.theme.blueColor};
  width: 100%;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  text-align: center;
  padding: 7px 7px;
  cursor: pointer;
`;

export default ({
  setAction,
  action,
  username,
  firstName,
  lastName,
  secret,
  email,
  onSubmit,
}) => {
  return (
    <Wrapper>
      <Form>
        {action === "logIn" && (
          <>
            <Helmet>
              <title>Log In / jinstagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <InputBox>
                <Input placeholder={"Email"} {...email} type="email"></Input>
              </InputBox>
              <EButton>Log In</EButton>
            </form>
          </>
        )}

        {action === "signUp" && (
          <>
            <Helmet>
              <title>Sign Up / jinstagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <InputBox>
                <Input placeholder={"Firstname"} {...firstName}></Input>
                <Input placeholder={"Lastname"} {...lastName}></Input>
                <Input placeholder={"Email"} {...email} type="email"></Input>
                <Input placeholder={"Username"} {...username}></Input>
              </InputBox>
              <EButton>Sign Up</EButton>
            </form>
          </>
        )}

        {action === "confirm" && (
          <>
            <Helmet>
              <title>Confirm / jinstagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <InputBox>
                <Input
                  placeholder={"Paste your Secret"}
                  required
                  {...secret}
                ></Input>
              </InputBox>
              <EButton>Confirm</EButton>
            </form>
          </>
        )}
      </Form>
      {action !== "confirm" && (
        <StateChanger>
          {action === "logIn" ? (
            <>
              Don't have an account?{" "}
              <Link onClick={() => setAction("signUp")}>Sign up</Link>
            </>
          ) : (
            <>
              Have an account?{" "}
              <Link onClick={() => setAction("logIn")}>Log in</Link>
            </>
          )}
        </StateChanger>
      )}
    </Wrapper>
  );
};
