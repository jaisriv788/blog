import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "@/components/ui/Blog";

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

function Blogs() {
  const [data, setData] = useState<BlogData[]>([]);
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
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className="h-l pt-20 flex flex-col items-center gap-5">
      {data.map((data) => (
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
      ))}
      {data.map((data) => (
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
      ))}
      {data.map((data) => (
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
      ))}
    </div>
  );
}

export default Blogs;
