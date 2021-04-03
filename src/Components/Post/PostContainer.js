import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
  id,
  location,
  caption,
  user,
  files,
  likes,
  comments,
  isLiked,
  likeCounts,
  commentCounts,
  createdAt,
}) => {
  const newComment = useInput("");
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountsS, setLikeCounts] = useState(likeCounts);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const [showComments, setShowComments] = useState(3);
  const [toggleLikeM] = useMutation(TOGGLE_LIKE, { variables: { postId: id } });
  const [addCommentM] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: newComment.value },
  });

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };

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

  const onShowComments = () => {
    if (showComments === 3) {
      setShowComments(commentCounts);
    } else {
      setShowComments(3);
    }
  };

  const onClicked = () => {
    //
  };
  return (
    <PostPresenter
      id={id}
      location={location}
      caption={caption}
      user={user}
      files={files}
      likes={likes}
      comments={comments}
      commentCounts={commentCounts}
      createdAt={createdAt}
      newComment={newComment}
      likeCounts={likeCountsS}
      currentItem={currentItem}
      isLikedS={isLikedS}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      onPosted={onPosted}
      selfComments={selfComments}
      showComments={showComments}
      onShowComments={onShowComments}
      onClicked={onClicked}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }),
    })
  ),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ),
  isLiked: PropTypes.bool.isRequired,
  likeCounts: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default PostContainer;
