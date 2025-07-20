"use client";
import { Blog, User } from "@/generated/prisma";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = React.use(searchParams);
  const { userId } = React.use(searchParams);

  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<Blog>();
  const [user, setUser] = useState<User>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const blogResponse = await axios.get(`/api/blog?id=${id}`);
      const userResponse = await axios.get(`/api/user/${userId}`);

      if (blogResponse.data && userResponse.data) {
        setBlog(blogResponse.data.data);
        setUser(userResponse.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center m-4 pt-16" >
      {loading ? (
        <Loading />
      ) : (
        <Card className="w-1/3 h-full flex flex-col justify-between">
          <CardHeader>
            <CardTitle> {blog?.title} </CardTitle>
            <CardAction>{user?.name}</CardAction>
          </CardHeader>
          <CardContent>
            <p>{blog?.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="ghost">Like</Button>
              <Button variant="ghost">Comment</Button>
            </div>

          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Page;
