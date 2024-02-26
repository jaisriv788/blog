import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/routes/Blogs";
import Blog from "./components/routes/Blog";
import Updateblog from "./components/routes/Updateblog";
import Signup from "./components/routes/Signup";
import Signin from "./components/routes/Signin";
import Navbar from "@/components/ui/Navbar";
import SuccessSignup from "@/components/ui/SuccessSignup";
import SuccessSignin from "@/components/ui/SuccessSignin";

export default function Home() {
  const [successSignup, setSuccessSignup] = useState(false);
  const [successSignin, setSuccessSignin] = useState(false);

  function handleSuccessfulSignup() {
    setSuccessSignup(true);
    setTimeout(() => {
      setSuccessSignup(false);
    }, 1000);
  }

  function handleSuccessfulSignin() {
    setSuccessSignin(true);
    setTimeout(() => {
      setSuccessSignin(false);
    }, 1000);
  }

  return (
    <div className="bg-slate-200">
      <Navbar />
      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/update" element={<Updateblog />} />
        <Route
          path="/signup"
          element={<Signup signupSuccess={handleSuccessfulSignup} />}
        />
        <Route
          path="/signin"
          element={<Signin signinSuccess={handleSuccessfulSignin} />}
        />
      </Routes>
      {successSignup && <SuccessSignup />}
      {successSignin && <SuccessSignin />}
    </div>
  );
}
