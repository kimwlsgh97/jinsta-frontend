import React, { useState } from "react";
import EditProfilePresenter from "./EditProfilePresenter";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { EDIT_PROFILE, ME } from "./EditProfileQueries";
import Loader from "../../Components/Loader";

export const EditProfileContainer = () => {
  const username = useInput("");
  const avatar = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const bio = useInput("");
  const { data, loading } = useQuery(ME);
  const [EditProfileM] = useMutation(EDIT_PROFILE, {
    variables: {
      username: username.value,
      avatar: avatar.value,
      firstName: firstName.value,
      lastName: lastName.value,
      bio: bio.value,
    },
  });
  const onPosted = () => {
    if (username.value === "" || username.value === undefined) {
      toast.error("You need to fill username.");
    } else {
      toast.success("Cool");
    }
  };
  if (!loading) {
    return (
      <EditProfilePresenter
        username={username}
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        bio={bio}
        onPosted={onPosted}
        data={data}
      />
    );
  } else return <Loader />;
};

export default EditProfileContainer;
