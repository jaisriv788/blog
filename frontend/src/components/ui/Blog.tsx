import BlogHoverCard from "@/components/routes/BlogHoverCard";
import { useState } from "react";
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
    <div className="w-10/12 sm:w-1/2 h-fit bg-white px-4 py-3 rounded-lg">
      <div className="font-bold text-2xl pb-3 underline">{props.title}</div>
      <div className="text-pretty">
        {props.content.slice(0, 250)}
        <Link to="/blog">{"...read more"}</Link>
      </div>
      <div className="pt-3 text-slate-500">
        -by <BlogHoverCard name={props.authorName} email={props.email} />{" "}
      </div>
    </div>
  );
}

export default Blog;
//{props.content}
