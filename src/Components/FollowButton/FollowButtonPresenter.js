import React from "react";
import styled from "styled-components";
import Button from "../Button";

const EButton = styled(Button)``;

const FollowButtonPresenter = ({ isFollowingS, onClick }) => {
  return (
    <EButton text={isFollowingS ? "Unfollow" : "Follow"} onClick={onClick} />
  );
};

export default FollowButtonPresenter;
