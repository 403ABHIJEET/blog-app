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
import Like from "@/components/blog/Like";
import AvatarCustom from "@/components/navbar/AvatarCustom";
import { getTimeAgo } from "@/util/common";
import { CommentSvg } from "@/util/svgs";
import CommentSection from "@/components/comments/CommentSection";

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
    <div className="flex justify-center m-4 pt-16">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-2/5 py-1">
          <Card className=" flex flex-col justify-between border-none bg-gray-100 shadow-none gap-2 py-2">
            <CardHeader className="flex justify-start items-center">
              {
                user && 
                <AvatarCustom
                  userImage={user?.image ?? ""}
                  userName={user?.name ?? ""}
                />
              }
              <CardAction className="flex items-center text-gray-700">
                r/{user?.name} • {getTimeAgo(blog?.createdAt)}
              </CardAction>
            </CardHeader>

            <CardHeader>
                <CardTitle className=" cursor-pointer text-[#5C6C74] text-xl">
                  {blog?.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="break-words overflow-hidden">
                <p className="break-words cursor-pointer text-gray-700 text-sm">
                  {blog?.content}
                </p>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <div className="flex gap-2 text-gray-600">
                {blog && <Like blogId={blog.id} />}
                  <Button
                    variant="ghost"
                    className="p-0 m-0 hover:bg-gray-300 bg-none rounded-4xl"
                  >
                    <CommentSvg /> <span className="text-black">{100}</span>
                  </Button>
              </div>
            </CardFooter>
          </Card>
          <CardFooter>
              {blog && <CommentSection blogId={blog?.id} parentId={0} level={0} />}
          </CardFooter>
        </div>
      )}
    </div>
  );
};

export default Page;
