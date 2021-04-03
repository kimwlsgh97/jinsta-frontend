import React from "react";
import FullPostContainer from "./FullPostContainer";
import Loader from "../../Components/Loader";
import { useQuery } from "@apollo/react-hooks";
import { FULL_POST } from "./FullPostQueries";
import { withRouter } from "react-router-dom";

export default withRouter(({ location: { pathname } }) => {
  const postId = pathname.split("/post/")[1];
  const { data, loading } = useQuery(FULL_POST, { variables: { id: postId } });
  if (loading) {
    return <Loader />;
  } else {
    return <FullPostContainer data={data} postId={postId} />;
  }
});
