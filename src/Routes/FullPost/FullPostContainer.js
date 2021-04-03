import React, { useState } from "react";
import FullPostPresenter from "./FullPostPresenter";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "../../Components/Post/PostQueries";
import { useMutation } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";

export const FullPostContainer = ({ data, postId }) => {
  const newComment = useInput("");
  const [selfComments, setSelfComments] = useState([]);
  const [toggleLikeM] = useMutation(TOGGLE_LIKE, {
    variables: { postId },
  });
  const [addCommentM] = useMutation(ADD_COMMENT, {
    variables: { postId, text: newComment.value },
  });

  const {
    seeFullPost: { comments, files, likeCounts, user, createdAt },
    isLiked,
  } = data;

  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountsS, setLikeCounts] = useState(likeCounts);

  const toggleLike = async () => {
    try {
      if (isLikedS === true) {
        setIsLiked(false);
        setLikeCounts(likeCountsS - 1);
      } else {
        setIsLiked(true);
        setLikeCounts(likeCountsS + 1);
      }
      await toggleLikeM();
    } catch {
      toast.error("Can't register like");
    }
  };
  const onKeyPress = async (e) => {
    if (e.which === 13) {
      e.preventDefault();
      newComment.setValue("");
      try {
        const {
          data: { addComment },
        } = await addCommentM();
        setSelfComments([...selfComments, addComment]);
      } catch {
        toast.error("Can't send comment");
      }
    }
  };

  const onPosted = async () => {
    newComment.setValue("");
    try {
      const {
        data: { addComment },
      } = await addCommentM();
      setSelfComments([...selfComments, addComment]);
    } catch {
      toast.error("Can't send comment");
    }
  };

  console.log(user);

  return (
    <>
      <Helmet>
        <title>Post | {user.username}</title>
      </Helmet>
      <FullPostPresenter
        newComment={newComment}
        onKeyPress={onKeyPress}
        onPosted={onPosted}
        selfComments={selfComments}
        comments={comments}
        files={files}
        likeCounts={likeCounts}
        user={user}
        createdAt={createdAt}
        isLikedS={isLikedS}
        likeCountsS={likeCountsS}
        toggleLike={toggleLike}
      />
    </>
  );
};

export default FullPostContainer;
