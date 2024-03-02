import BlogHoverCard from "@/components/routes/BlogHoverCard";
import { useState } from "react";

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
  const [readMore, setReadMore] = useState(true);

  function toggleReadMore() {
    setReadMore(!readMore);
  }

  return (
    <div className="w-10/12 sm:w-1/2 h-fit bg-white px-4 py-3 rounded-lg border-2 border-slate-300">
      <div className="font-bold text-2xl pb-3 underline">{props.title}</div>
      <div className="text-pretty">
        {readMore ? props.content.slice(0, 250) : props.content}{" "}
        <span onClick={toggleReadMore} className="text-sky-700 underline cursor-pointer">
          {readMore ? "...read more" : "show less"}
        </span>
      </div>
      <div className="pt-3 text-slate-500">
        -by <BlogHoverCard name={props.authorName} email={props.email} />{" "}
      </div>
    </div>
  );
}

export default Blog;
