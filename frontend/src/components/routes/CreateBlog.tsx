import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Error from "@/components/ui/Error";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PostType } from "alpha788-blog-typecheck";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

interface HandleToken {
  handleToken: () => void;
}

function CreateBlog(props: HandleToken) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  async function handlePost() {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const body: PostType = { title, content, published };
        const token = localStorage.getItem("key");
        const response = await axios.post(
          "https://blog-backend.jaisrivastava788.workers.dev/api/v1/blog",
          {
            title: body.title,
            content: body.content,
            published: body.published,
          },
          {
            headers: {
              auth: token,
            },
          }
        );
        if (response.data.hasOwnProperty("status")) {
          if (response.data.status) {
            navigate("/allblogs");
          } else {
            setErrorMessage(response.data.message);
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
            }, 1500);
          }
        }
        if (response.data.tokenExpired) {
          props.handleToken();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => controller.abort();
  }

  function handleTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleContent(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function handlePublish() {
    setPublished(!published);
  }

  function handleCancel() {
    setTitle("");
    setContent("");
    setPublished(false);
  }

  return (
    <div className=" h-screen flex justify-center items-center">
      <Card className="w-[550px] h-fit bg-black border-2 border-gray-400 text-white">
        <CardHeader className="flex items-center">
          <CardTitle className="font-bold underline ">My Blog</CardTitle>
          <CardDescription className="text-slate-300">
            Share your thoughts by creating your Blogs.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="underline underline-offset-2" htmlFor="email">
                  Title
                </Label>
                <input
                  className="py-2 pl-3 w-full border-2 text-black border-slate-200 rounded-lg"
                  placeholder="Give your Blog a title."
                  onChange={handleTitle}
                  value={title}
                />
              </div>
              <div className=" flex flex-col space-y-1.5">
                <Label className="underline underline-offset-2" htmlFor="name">
                  Content
                </Label>
                <textarea
                  className="rounded-lg h-40 text-black"
                  placeholder="Write something here...."
                  onChange={handleContent}
                  value={content}
                />
              </div>
              <div className="flex items-center gap-4 space-y-1.5">
                <Label className="underline underline-offset-2" htmlFor="name">
                  Publish
                </Label>
                <Switch
                  className="border-2 border-slate-600"
                  onClick={handlePublish}
                  checked={published}
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center">
          <div className="flex gap-4 w-full">
            <Button
              className="w-full bg-white text-black"
              onClick={handleCancel}
            >
              Reset
            </Button>

            {published ? (
              <Button className="w-full bg-slate-800" onClick={handlePost}>
                Post
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger className="w-full bg-slate-800 px-4 rounded-md text-sm font-semibold">
                  Post
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action will not publish your{" "}
                      <strong className="underline">Blog</strong>. If you
                      proceed then you can publish it by updating it.
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    className="w-fit px-8 bg-slate-800"
                    onClick={handlePost}
                  >
                    submit
                  </Button>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardFooter>
      </Card>
      {showError && <Error errorMessage={errorMessage} />}
    </div>
  );
}

export default CreateBlog;
