import { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/routes/Blogs";
import Blog from "./components/routes/Blog";
import CreateBlog from "./components/routes/CreateBlog";
import Updateblog from "./components/routes/Updateblog";
import Signup from "./components/routes/Signup";
import Signin from "./components/routes/Signin";
import Navbar from "@/components/ui/Navbar";
import SuccessSignup from "@/components/ui/SuccessSignup";
import SuccessSignin from "@/components/ui/SuccessSignin";

export default function Home() {
  const [successSignup, setSuccessSignup] = useState(false);
  const [successSignin, setSuccessSignin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    }, 1000);
  }

  function handleSuccessfulSignup() {
    setSuccessSignup(true);
    setTimeout(() => {
      setSuccessSignup(false);
    }, 1000);
  }
  const navbar = useMemo(() => {
    console.log("j");
    return <Navbar handleNavbar={handleNavbar} isLoggedIn={isLoggedIn} />;
  }, [isLoggedIn]);

  function handleNavbar() {
    localStorage.removeItem("key");
    setIsLoggedIn(false);
  }

  return (
    <div className="bg-slate-200">
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
        <Route path="/allblogs" element={<Blogs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/update" element={<Updateblog />} />
      </Routes>
      {successSignup && <SuccessSignup />}
      {successSignin && <SuccessSignin />}
    </div>
  );
}
