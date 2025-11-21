// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./Body";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Request from "./pages/Request";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
