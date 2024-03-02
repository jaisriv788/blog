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
