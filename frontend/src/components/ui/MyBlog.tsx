import { Link } from "react-router-dom";
import { Button } from "./button";

interface BlogData {
  authorId?: string;
  content: string;
  id?: string;
  title: string;
  published?: boolean;
}

function MyBlog(props: BlogData) {
  return (
    <div className="w-10/12 sm:w-5/12 h-fit bg-white px-4 py-3 rounded-lg border-2 border-slate-300">
      <div className="font-bold text-2xl underline">{props.title}</div>
      <div className="text-pretty py-3">
        {props.content.slice(0, 250)}
        <Link to="/blog" className="text-sky-700">
          ...read more
        </Link>
      </div>
      <div className="flex gap-5">
        <Button className="bg-red-500 hover:bg-red-700">Delete</Button>
        <Button className="bg-white border-2 border-black text-black hover:text-white ">
          Update
        </Button>
      </div>
    </div>
  );
}

export default MyBlog;
