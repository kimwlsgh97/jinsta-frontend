import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Search from "../Routes/Search";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Message from "../Routes/Message";
import FullPost from "../Routes/FullPost";
import EditProfile from "../Routes/EditProfile";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/Search" component={Search} />
    <Route path="/Send" component={Message} />
    <Route path="/Explore" component={Explore} />
    {/* <Route path="/Liked" component={} /> */}
    <Route path="/user/:username" component={Profile} />
    <Route path="/post/:caption" component={FullPost} />
    <Route path="/EditProfile" component={EditProfile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
