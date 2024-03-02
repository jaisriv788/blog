import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PenTool, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Navbar {
  handleNavbar: () => void;
  isLoggedIn: boolean;
}

function Navbar(props: Navbar) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  function handleSignUp(e: any) {
    e.preventDefault();
    navigate("/");
  }

  function handleSignIn(e: any) {
    e.preventDefault();
    navigate("/signin");
  }

  function handleLogout(e: any) {
    e.preventDefault();
    navigate("/signin");
    props.handleNavbar();
  }

  function handleCreateBlog(e: any) {
    e.preventDefault();
    navigate("/createblog");
  }

  function handleHome(e: any) {
    e.preventDefault();
    navigate("/allblogs");
  }

  function handleMyBlogs(e: any) {
    e.preventDefault();
    navigate("/myblogs");
  }

  return (
    <div className="fixed w-screen z-50 bg-black text-white py-4 px-4 flex content-center justify-between">
      <Link
        to={props.isLoggedIn ? "/allblogs" : "/signin"}
        className="text-3xl font-bold flex items-center gap-1"
      >
        <p>Blog</p>
        <PenTool />
      </Link>
      {props.isLoggedIn ? (
        windowWidth < 600 ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-2 outline-none">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleHome}>Home</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCreateBlog}>
                Create Blog
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleMyBlogs}>
                My Blogs
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="mr-6 flex items-center gap-4">
            <Link className=" hover:text-slate-300" to="/allblogs">
              Home
            </Link>
            <Link className=" hover:text-slate-300" to="/createblog">
              Create Blog
            </Link>
            <Link className=" hover:text-slate-300" to="/myblogs">
              My Blogs
            </Link>
            <span
              className="cursor-pointer hover:text-slate-300"
              onClick={handleLogout}
            >
              Logout
            </span>
          </div>
        )
      ) : (
        <div className="flex gap-6">
          <button
            onClick={handleSignUp}
            className="px-2 py-1 border-2 border-white rounded-sm hover:bg-white hover:text-black"
          >
            SignUp
          </button>
          <button
            onClick={handleSignIn}
            className="px-2 py-1 border-2 border-white rounded-sm hover:bg-white hover:text-black"
          >
            SignIn
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
