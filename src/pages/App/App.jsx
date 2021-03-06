import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import userService from "../../utils/userService";
import CreatePage from "../CreatePage/CreatePage";
import FeedPage from "../FeedPage/FeedPage";
import HomePage from "../HomePage/HomePage";
import Layout from "../Layout/Layout";

function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); 
  // where user was the document we created from mongo
  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<Layout user={user} handleLogout={handleLogout} />}
        >
          <Route index element={<HomePage user={user} />}></Route>
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} /> 
          <Route path="/:username" element={<ProfilePage user={user} />} />
          <Route path="/form" element={<CreatePage />} />
          <Route path="/feed" element={<FeedPage user={user} />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
