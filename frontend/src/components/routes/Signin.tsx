import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "@/components/ui/Error";
import { SigninType } from "alpha788-blog-typecheck";

interface SigninProps {
  signinSuccess: (token: string) => void;
}

const Signin: React.FC<SigninProps> = ({ signinSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hidden, setHidden] = useState(true);

  const navigate = useNavigate();

  function emailHandeler(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function passwordHandeler(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handlePassword() {
    setHidden(!hidden);
  }

  async function handleSignIn() {
    const body: SigninType = { email, password };
    const response = await axios.post(
      "https://blog-backend.jaisrivastava788.workers.dev/api/v1/signin",
      {
        email: body.email,
        password: body.password,
      }
    );

    if (response.data.status) {
      navigate("/allblogs");
      signinSuccess(response.data.token);
    } else {
      setErrorMessage(response.data.message);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  }

  return (
    <div className="my-bg h-screen flex flex-col justify-center items-center">
      <Card className="w-[350px] h-fit bg-transparent backdrop-blur-lg border-2 border-gray-400">
        <CardHeader className="flex items-center">
          <CardTitle className="font-bold underline">SignIn</CardTitle>
          <CardDescription>
            Lets connect our ideas together via{" "}
            <strong className="underline">Blog</strong>.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  className="py-2 pl-3 w-full border-2 border-slate-200 rounded-lg"
                  placeholder="e.g. demo@gmail.com"
                  onChange={emailHandeler}
                  autoComplete="on"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="myfocus flex items-center border-2 border-slate-200 rounded-lg overflow-hidden">
                  <input
                    id="password"
                    type={hidden ? "password" : "text"}
                    className="py-2 pl-3 w-full outline-none"
                    placeholder="e.g. Abc@1234"
                    autoComplete="on"
                    onChange={passwordHandeler}
                  />
                  <div className="w-min" onClick={handlePassword}>
                    {hidden ? (
                      <Eye className="mx-2" />
                    ) : (
                      <EyeOff className="mx-2" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleSignIn}>
            SignIn
          </Button>
          <p>
            Do not have an account!{" "}
            <Link to="/" className="underline text-blue-800">
              SignUp
            </Link>
          </p>
        </CardFooter>
      </Card>
      {error && <Error errorMessage={errorMessage} />}
    </div>
  );
};

export default Signin;
