import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile";
import PostList from "./components/Post/PostList";
import GroupList from "./components/Group/GroupList";
import GroupCreate from "./components/Group/GroupCreate";
import GroupPage from "./components/Group/GroupPage";
import ProfileComponent from "./components/Profile/ProfileComponent";

import Event from "./utils/Event";
import PrivateRoute from "./utils/PrivateRoute";
import Search from "./components/Search/Search";
function App() {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [searchInput, setSearchInput] = useState();

  const user = AuthService.getCurrentUser();

  useEffect(() => {

    if (user) {
      setCurrentUser(user);
    }

    Event.on("logout", () => {
      logOut();
    });

    return () => {
      Event.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div className="theme-layout">
      <div className="topbar stick">
        <div className="logo">
          <a title="" href="newsfeed.html"><img src="images/logo.png" alt="" /></a>
        </div>
        
        <div className="top-area">
          <ul className="main-menu">
            <li>
              <Link to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/posts"}>
                Posts
              </Link>
            </li>
            <li>
              <Link to={"/groups"}>
                Groups
              </Link>
            </li>
          </ul>
          <ul className="setting-area">
            <li >
                <input 
                    type="text"  
                    className="form-control "
                    placeholder="Search..." 
                    onChange={(e) => setSearchInput(e.target.value)}
                />
              
            </li>
            <li>{user && <Link to={"/search/" + searchInput}>
            <a href="#" title="Home" className="" data-ripple=""><i className="ti-search"></i></a>
            </Link>}
               
            </li>     
          </ul>
          <div className="user-img">
          { user &&  <Link to={"/profile/" + user.id}>
          <img src="images/resources/admin.jpg" alt="" />

          </Link> }
            <span className="status f-online"></span>
            <div className="user-setting">
              <a href="#" title=""><span className="status f-online"></span>online</a>
              <a href="#" title=""><span className="status f-away"></span>away</a>
              <a href="#" title=""><span className="status f-off"></span>offline</a>
              <a href="#" title=""><i className="ti-user"></i> view profile</a>
              <a href="#" title=""><i className="ti-pencil-alt"></i>edit profile</a>
              <a href="#" title=""><i className="ti-target"></i>activity log</a>
              <a href="#" title=""><i className="ti-settings"></i>account setting</a>
              <a href="#" title=""><i className="ti-power-off"></i>log out</a>
            </div>
          </div>
          <span className="ti-menu main-menu" data-ripple=""></span>
        </div>
      </div>
     
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/posts"} className="nav-link">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="mt-3">
        <Routes>
          {/* Cần thêm feature khi jwt expired thì redirect user về /login */}
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          {/* Thêm privateroute vào các route cần auth mới truy cập được */}
          <Route path="/posts" element={
            <PrivateRoute>
              <PostList />
            </PrivateRoute>
          } />
          <Route path="/groups" element={
            <PrivateRoute>
              <GroupList />
            </PrivateRoute>
          } />
          <Route path="/group/create" element={
            <PrivateRoute>
              <GroupCreate />
            </PrivateRoute>
          } />
          <Route path="/group/:id" element={
            <PrivateRoute>
              <GroupPage />
            </PrivateRoute>
          } />


        <Route path="/profile/:userID" element={
            <PrivateRoute>
              <ProfileComponent />
            </PrivateRoute>
          } />
        <Route path="/search/:keyword" element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}
export default App;