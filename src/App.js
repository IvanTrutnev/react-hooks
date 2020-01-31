import React from "react";
import { Routes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from "./components/topbar";
import {CurrentUserProvider} from './context/currentUser';

function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
