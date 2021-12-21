import Spinner from "./components/Spinner/Spinner";
import { UserContext } from "./contexts/UserContext";
import "./fulminata.css";

import React, { useContext, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";

const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Home = React.lazy(() => import("./pages/home/Home"));
const Write = React.lazy(() => import("./pages/write/Write"));
const Settings = React.lazy(() => import("./pages/settings/Settings"));
const Login = React.lazy(() => import("./pages/login/Login"));
const Register = React.lazy(() => import("./pages/register/Register"));
const About = React.lazy(() => import("./pages/about/About"));
const Error = React.lazy(() => import("./pages/error/Error"));
const Search = React.lazy(() => import("./pages/search/Search"));
const Contact = React.lazy(() => import("./pages/contact/Contact"));
const Explore = React.lazy(() => import("./pages/explore/Explore"));
const Userspec = React.lazy(() => import("./pages/userspec/Userspec"));
const FocusPage = React.lazy(()=> import("./components/FocusPage/FocusPage"));
const Welcome = React.lazy(() => import("./pages/welcome/Welcome"));
const SearchResult = React.lazy(() => import("./pages/searchresult/SearchResult"));
const LikedPosts = React.lazy(() => import("./pages/likedposts/LikedPosts"));
const LeonidasPage = React.lazy(() => import("./pages/docs/Leonidas/LeonidasPage"));
const Header = React.lazy(() => import("./components/Header/Header"));
const Sidebar = React.lazy(() => import("./components/Sidebar/Sidebar"));
const DeleteConfirmation = React.lazy(() => import("./components/DeleteConfirmation/DeleteConfirmation"));

function App() {
  //Check if there is a user logged in
  const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);

  useEffect(() => {
    const init = async () => {
      setLoggedin(JSON.parse(window.localStorage.getItem("loggedin")) || false);
      if (loggedin) {
        const res = await axios.get(
          "http://localhost:5000/api/users" + user._id
        );
        localStorage.setItem("user_data", JSON.stringify(res.data));
        setUser(res.data);
      }
    };
    setUser(JSON.parse(window.localStorage.getItem("user_data")) || {});
    setLoggedin(JSON.parse(window.localStorage.getItem("loggedin")) || false);
    init();
  }, []);

  return (
    <>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/">
              {loggedin ? <Redirect to="/home" /> : <Redirect to="/welcome" />}
            </Route>

            <Route path="/home">
              <Home />
            </Route>

            <Route path="/register">
              {loggedin ? <Redirect to="/home" /> : <Register />}
            </Route>

            <Route path="/login">
              {loggedin ? <Redirect to="/home" /> : <Login />}
            </Route>

            <Route path="/write">
              <>{loggedin ? <Write /> : <Login />}</>
            </Route>

            <Route path="/settings">
              <>{loggedin ? <Settings /> : <Login />}</>
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/welcome">
              <Welcome />
            </Route>

            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/post/:id">
              <FocusPage />
            </Route>

            <Route path="/error/:message">
              <Error />
            </Route>

            <Route path="/userspec/:id">
              <Userspec />
            </Route>

            <Route path="/likedposts">
              <LikedPosts />
            </Route>

            <Route path="/explore">
              <Explore />
            </Route>

            <Route path="/search">
              <Search />
            </Route>

            <Route path="/result">
              <SearchResult />
            </Route>

            {/*DEV PATHS*/}
            <Route path="/dev/spinner">
              <Spinner />
            </Route>

            <Route path="/dev/deleteconfirmation">
              <DeleteConfirmation />
            </Route>

            <Route path="/dev/hero">
              <Header />
            </Route>

            <Route path="/dev/sidebar">
              <Sidebar />
            </Route>

            {/*DOCS PATHS*/}
            <Route path="/docs/leonidas">
              <LeonidasPage />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
