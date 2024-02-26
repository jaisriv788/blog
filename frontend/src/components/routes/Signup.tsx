import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "@/components/ui/Error";
import { SignupType } from "alpha788-blog-typecheck";

interface SignupProps {
  signupSuccess: () => void;
}

const Signup: React.FC<SignupProps> = ({ signupSuccess }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function emailHandeler(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function nameHandeler(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function passwordHandeler(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSignUp() {
    
    const body : SignupType = {email,name,password}
    const response = await axios.post(
      "https://blog-backend.jaisrivastava788.workers.dev/api/v1/signup",
      {
        email : body.email,
        name: body.name,
        password: body.password,
      }
    );

    if (response.data.status) {
      navigate("/blogs");
      signupSuccess();
    } else {
      setErrorMessage(response.data.message);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Card className="w-[350px] h-fit">
        <CardHeader className="flex items-center">
          <CardTitle className="font-bold underline">SignUp</CardTitle>
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
                <Input
                  id="email"
                  placeholder="Enter your email (e.g. demo@gmail.com)"
                  onChange={emailHandeler}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name (e.g. Jhon Doe)"
                  onChange={nameHandeler}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passowrd">Password</Label>
                <Input
                  id="passowrd"
                  placeholder="Enter your passowrd (e.g. Abc@1234)"
                  onChange={passwordHandeler}
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleSignUp}>
            SignUp
          </Button>
          <p>
            Already have an Account!{" "}
            <Link to="/signin" className="underline text-blue-800">
              SignIn
            </Link>
          </p>
        </CardFooter>
      </Card>
      {error && <Error errorMessage={errorMessage} />}
    </div>
  );
};

export default Signup;
