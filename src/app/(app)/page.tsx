"use client";
import { Blog } from "@/generated/prisma";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import Loading from "@/app/(app)/loading";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/blog");

      if (response.data) {
        const shuffle = response.data.data.sort(() => 0.5 - Math.random());
        setBlogs(shuffle);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="grid pt-16">
      {!loading ? (
        blogs.length ? (
          blogs.map((blog: Blog) => (
            <div key={blog.id} className="flex justify-center">
              <BlogCard blog={blog} />
            </div>
          ))
        ) : (
          <div></div>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
