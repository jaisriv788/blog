import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  function handleSignUp(e: any) {
    e.preventDefault();
    navigate("/signup");
  }

  function handleSignIn(e: any) {
    e.preventDefault();
    navigate("/signin");
  }

  return (
    <div className="absolute w-screen bg-black text-white py-4 px-4 flex content-center justify-between">
      <Link to="/" className="text-3xl font-bold">
        Blog
      </Link>
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
    </div>
  );
}

export default Navbar;
