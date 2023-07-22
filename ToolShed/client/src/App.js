import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Header from "./components/Header"
import ApplicationViews from "./components/ApplicationViews"
import { onLoginStatusChange } from "./modules/authManager";
import { me } from './modules/authManager';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
      <ApplicationViews isLoggedIn={isLoggedIn} userProfile={userProfile} />
    </BrowserRouter>
  );
}

export default App;
