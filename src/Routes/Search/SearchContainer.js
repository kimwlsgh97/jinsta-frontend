import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { SEARCH } from "./SearchQueries";
import { useQuery } from "@apollo/react-hooks";

export default withRouter(({ location: { search } }) => {
  const term = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === "" || search === undefined,
    variables: {
      term: term,
    },
  });
  return <SearchPresenter term={term} loading={loading} data={data} />;
});
