import React from "react";
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import { HashRouter as Router } from "react-router-dom";
import Theme from "../Styles/Theme";
import { useQuery } from "@apollo/react-hooks";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Route from "./Routes";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
//이걸 하지 않는다면 react-apollo가, query를 api로 보내려고 할것이다.
//<Query>{({data}) => component </Query> 이런식의 쿼리보다 훨씬 좋다?
//graphql 쿼리를 사용해 데이터베이스에서 정보를 받아옴

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  height: auto;
`;

function App() {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);

  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Router>
          <>
            <Header />
            <Wrapper>
              <Route isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
          </>
        </Router>
      </ThemeProvider>
    </div>
  );
}
//ThemeProvider는 모든 하위 componenet에게 theme을 props으로 준다.

export default App;
