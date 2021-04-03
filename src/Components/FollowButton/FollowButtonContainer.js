import React, { useState } from "react";
import PropTypes from "prop-types";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { useMutation } from "@apollo/react-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import { toast } from "react-toastify";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowingS] = useState(isFollowing);
  const [unfollowM] = useMutation(UNFOLLOW, { variables: { id } });
  const [followM] = useMutation(FOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowingS(false);
      try {
        unfollowM();
      } catch {
        toast.error("Can't unfollow, try again");
        setIsFollowingS(true);
      }
    } else {
      setIsFollowingS(true);
      try {
        followM();
      } catch {
        toast.error("Can't follow, try again");
        setIsFollowingS(false);
      }
    }
  };

  return (
    <FollowButtonPresenter isFollowingS={isFollowingS} onClick={onClick} />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;
