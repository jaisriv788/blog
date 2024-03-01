import axios from "axios";
import { useEffect, useState } from "react";
import MyBlog from "../ui/MyBlog";

interface MyBlogs {
  authorId: string;
  content: string;
  id: string;
  title: string;
  published: boolean;
}

interface HandleToken {
  handleToken: () => void;
}

function MyBlogs(props: HandleToken) {
  const [data, setData] = useState<MyBlogs[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("key");
        const response = await axios.get(
          "https://blog-backend.jaisrivastava788.workers.dev/api/v1/blog/myblogs",
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className="pt-20 h-screen flex flex-wrap justify-center sm:justify-evenly gap-5">
      {data.map((data) => {
        return (
          <MyBlog key={data.id} title={data.title} content={data.content} />
        );
      })}
    </div>
  );
}

export default MyBlogs;
