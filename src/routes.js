import React from "react";
import { Switch, Route } from "react-router-dom";
import GlobalFeed from "./pages/globaFeed";
import { Article } from "./pages/article";
import Auth from "./pages/auth";
import TagFeed from './pages/tagFeed';
import YourFeed from "./pages/yourFeed";
import CreateArticle from "./pages/createArticle";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
