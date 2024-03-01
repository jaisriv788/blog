import { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/routes/Blogs";
import Blog from "./components/routes/Blog";
import MyBlogs from "./components/routes/MyBlogs";
import CreateBlog from "./components/routes/CreateBlog";
import Updateblog from "./components/routes/Updateblog";
import Signup from "./components/routes/Signup";
import Signin from "./components/routes/Signin";
import Navbar from "@/components/ui/Navbar";
import SuccessSignup from "@/components/ui/SuccessSignup";
import SuccessSignin from "@/components/ui/SuccessSignin";
import SessionEnd from "./components/ui/SessionEnd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [successSignup, setSuccessSignup] = useState(false);
  const [successSignin, setSuccessSignin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("key");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("key");
    if (isLoggedIn && !token) {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  function handleSuccessfulSignin(token: string) {
    localStorage.setItem("key", token);
    setIsLoggedIn(true);
    setSuccessSignin(true);
    setTimeout(() => {
      setSuccessSignin(false);
    }, 1500);
  }

  function handleSuccessfulSignup() {
    setSuccessSignup(true);
    setTimeout(() => {
      setSuccessSignup(false);
    }, 1500);
  }

  function handleNavbar() {
    localStorage.removeItem("key");
    setIsLoggedIn(false);
  }

  function handleToken() {
    navigate("/signin");
    localStorage.removeItem("key");
    setIsLoggedIn(false);
    setSession(true);
    setTimeout(() => {
      setSession(false);
    }, 1500);
  }

  const navbar = useMemo(() => {
    return <Navbar handleNavbar={handleNavbar} isLoggedIn={isLoggedIn} />;
  }, [isLoggedIn]);

  return (
    <div className=" h-full">
      {navbar}
      <Routes>
        <Route
          path="/"
          element={<Signup signupSuccess={handleSuccessfulSignup} />}
        />
        <Route
          path="/signin"
          element={<Signin signinSuccess={handleSuccessfulSignin} />}
        />
        <Route path="/allblogs" element={<Blogs handleToken={handleToken} />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/myblogs"
          element={<MyBlogs handleToken={handleToken} />}
        />
        <Route
          path="/createblog"
          element={<CreateBlog handleToken={handleToken} />}
        />
        <Route path="/update" element={<Updateblog />} />
      </Routes>
      {successSignup && <SuccessSignup />}
      {successSignin && <SuccessSignin />}
      {session && <SessionEnd />}
    </div>
  );
}
