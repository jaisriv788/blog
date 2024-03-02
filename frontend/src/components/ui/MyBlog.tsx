import { Button } from "./button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PostUpdate } from "alpha788-blog-typecheck";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState, ChangeEvent } from "react";

interface BlogData {
  authorId?: string;
  content: string;
  id: string;
  title: string;
  published?: boolean;
}

function MyBlog(props: BlogData) {
  const [previousTitle, setPreviousTitle] = useState("");
  const [previousContent, setPreviousContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [readMore, setReadMore] = useState(true);

  function toggleReadMore() {
    setReadMore(!readMore);
  }

  async function handleDelete() {
    try {
      const token = localStorage.getItem("key");
      const response = await axios.delete(
        `https://blog-backend.jaisrivastava788.workers.dev/api/v1/blog/${props.id}`,
        {
          headers: {
            auth: token,
          },
        }
      );
      console.log(response);
      location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdate() {
    try {
      const token = localStorage.getItem("key");
      const response = await axios.get(
        `https://blog-backend.jaisrivastava788.workers.dev/api/v1/blog/${props.id}`,
        {
          headers: {
            auth: token,
          },
        }
      );
      setPreviousTitle(response.data.data.title);
      setPreviousContent(response.data.data.content);
      setIsPublished(response.data.data.published);
    } catch (e) {
      console.log(e);
    }
  }

  function handlePublish() {
    setIsPublished(!isPublished);
  }

  function handleTitleUpdate(e: ChangeEvent<HTMLInputElement>) {
    setPreviousTitle(e.target.value);
  }

  function handleContentUpdate(e: ChangeEvent<HTMLTextAreaElement>) {
    setPreviousContent(e.target.value);
  }

  async function handleSubmit() {
    const body: PostUpdate = {
      id: props.id,
      title: previousTitle,
      content: previousContent,
      published: isPublished,
    };
    const token = localStorage.getItem("key");
    const response = await axios.put(
      "https://blog-backend.jaisrivastava788.workers.dev/api/v1/blog",
      {
        id: body.id,
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
    console.log(response);
    location.reload();
  }

  return (
    <div className="w-10/12 sm:w-5/12 h-fit bg-white px-4 py-3 rounded-lg border-2 border-slate-300">
      <div className="font-bold text-2xl underline">{props.title}</div>
      <div className="text-pretty py-3">
        {readMore ? props.content.slice(0, 250) : props.content}{" "}
        <span
          onClick={toggleReadMore}
          className="text-sky-700 underline cursor-pointer"
        >
          {readMore ? "...read more" : "show less"}
        </span>
      </div>
      <div className="flex gap-5">
        <Dialog>
          <DialogTrigger className="bg-red-500 hover:bg-red-700 h-10 text-white px-4 rounded-md text-sm font-semibold">
            Delete
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-red-600">Alert!</DialogTitle>
              <DialogDescription>
                This action will{" "}
                <strong className="underline text-red-600">
                  delete your Blog
                </strong>
                . If you proceed then you can click on delete button.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="w-fit px-8 bg-red-500 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger
            onClick={handleUpdate}
            className="rounded-md px-4 font-semibold text-sm bg-white border-2 border-black text-black hover:text-white hover:bg-gray-800"
          >
            Update
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-bold underline text-2xl">
                Update Blog
              </DialogTitle>
              <DialogDescription className="flex flex-col item gap-4">
                <div className="flex flex-col items-start gap-2">
                  <Label
                    className="underline underline-offset-2 text-black"
                    htmlFor="name"
                  >
                    Title
                  </Label>
                  <input
                    type="text"
                    className="text-black py-2 pl-3 w-full border-2 border-slate-200 rounded-lg"
                    onChange={handleTitleUpdate}
                    value={previousTitle}
                  />{" "}
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label
                    className="underline underline-offset-2 text-black"
                    htmlFor="name"
                  >
                    Content
                  </Label>
                  <textarea
                    className="text-black py-2 pl-3 w-full h-96 border-2 border-slate-200 rounded-lg"
                    onChange={handleContentUpdate}
                    value={previousContent}
                  />{" "}
                </div>
                <div className="flex items-center gap-4">
                  <Label
                    className="underline underline-offset-2 text-black"
                    htmlFor="name"
                  >
                    Publish
                  </Label>
                  <Switch
                    className="border-2 border-slate-600"
                    onClick={handlePublish}
                    checked={isPublished}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
            <Button className="w-fit px-8 bg-slate-800" onClick={handleSubmit}>
              Update
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default MyBlog;
