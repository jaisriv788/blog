import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "@/components/ui/Blog";
import AllBlogsSkeleton from "../ui/AllBlogsSkeleton";

interface Author {
  id: string;
  email: string;
  name: string;
  password: string;
}

interface BlogData {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: Author;
}

interface HandleToken {
  handleToken: () => void;
}

function Blogs(props: HandleToken) {
  const [data, setData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("key");
        const response = await axios.get(
          "https://blog-backend.jaisrivastava788.workers.dev/api/v1/blog",
          {
            headers: {
              auth: token,
            },
          }
        );
        if (response.data.tokenExpired) {
          props.handleToken();
        }
        if (response.data.status) {
          setData(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className="pt-20 pb-16 h-l flex flex-col items-center gap-5">
      <div className="fixed left-10 pt-2 pb-5 px-3 bg-white w-1/5 rounded-lg border-2 border-slate-300 hidden lg:block">
        <div className="text-lg font-semibold underline">About Blog</div>
        <div className="text-pretty">
          Welcome to <strong>Blog</strong> We are passionate about the power of
          words and the art of storytelling. Here, we believe that every voice
          matters, and we're dedicated to providing a platform where individuals
          can express themselves freely through the written word. At{" "}
          <strong>Blog</strong>, we embrace diversity and celebrate a wide range
          of perspectives, experiences, and ideas. Whether you're a seasoned
          writer or a newcomer to the world of blogging, we welcome you with
          open arms. Our community is built on mutual respect, creativity, and a
          shared love for meaningful content. Explore our collection of
          thought-provoking articles, insightful personal essays, captivating
          short stories, and everything in between. <br></br>
          <strong>Happy writing!</strong>
        </div>
      </div>
      <div className="fixed right-6 top-36 h-4/6 hidden 2xl:block">
        <img
          className=" w-80 h-full rounded-lg"
          src="https://images.pexels.com/photos/839443/pexels-photo-839443.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="img"
        />
      </div>
      {loading ? (
        <AllBlogsSkeleton />
      ) : (
        data.map((data) => (
          <Blog
            key={data.id}
            id={data.id}
            title={data.title}
            content={data.content}
            published={data.published}
            authorId={data.authorId}
            authorName={data.author.name}
            email={data.author.email}
          />
        ))
      )}
    </div>
  );
}

export default Blogs;
