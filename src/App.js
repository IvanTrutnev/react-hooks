import React from "react";
import { Routes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from "./components/topbar";
import { CurrentUserProvider } from './context/currentUser';
import CurrentUserChecker from "./components/CurrentUserChecker";

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar/>
          <Routes/>
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
