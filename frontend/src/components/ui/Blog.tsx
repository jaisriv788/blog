import BlogHoverCard from "@/components/routes/BlogHoverCard";
import { Link } from "react-router-dom";

interface BlogData {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  authorName: string;
  email: string;
}

function Blog(props: BlogData) {
  return (
    <div className="w-10/12 sm:w-1/2 h-fit bg-white px-4 py-3 rounded-lg border-2 border-slate-300">
      <div className="font-bold text-2xl pb-3 underline">{props.title}</div>
      <div className="text-pretty">
        {props.content.slice(0, 250)}
        <Link to="/blog" className="text-sky-700">...read more</Link>
      </div>
      <div className="pt-3 text-slate-500">
        -by <BlogHoverCard name={props.authorName} email={props.email} />{" "}
      </div>
    </div>
  );
}

export default Blog;
