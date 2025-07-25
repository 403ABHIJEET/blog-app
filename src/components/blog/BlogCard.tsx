import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog, User } from "@/generated/prisma";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingCard from "@/components/blog/LoadingCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { getTimeAgo } from "@/util/common";
import { CommentSvg } from "@/util/svgs";
import Like from "./Like";

interface props {
  blog: Blog;
}

export default function BlogCard(props: props) {
  
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  const fethcUserInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/user/${props.blog.userId}`);

      if (response.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fethcUserInfo();
  }, []);

  const blogLink = `/blog?id=${props.blog.id}&userId=${props.blog.userId}`

  return (
    <>
      {!loading ? (
        <div className="w-2/5 border-b-2 py-1">
          <Card className=" flex flex-col justify-between border-none hover:bg-gray-100 shadow-none gap-2 py-2">
            <CardHeader className="flex justify-start items-center">
              <Avatar className="w-6 h-6">
                <AvatarImage src={user?.image ?? ""} />
              </Avatar>
              <CardAction className="flex items-center text-gray-700">
                r/{user?.name} • {getTimeAgo(props.blog.createdAt)}
              </CardAction>
            </CardHeader>

            <CardHeader>
              <Link
                href={blogLink}
              >
                <CardTitle className=" cursor-pointer text-[#5C6C74] text-xl">
                  {props.blog.title}
                </CardTitle>
              </Link>
            </CardHeader>

            <CardContent className="break-words overflow-hidden">
              <Link
                href={blogLink}
              >
                <p className="break-words cursor-pointer text-gray-700 text-sm">
                  {props.blog.content.split(" ").slice(0, 70).join(" ")}...
                </p>
              </Link>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <div className="flex gap-2 text-gray-600">
                <Like blogId={props.blog.id} />
                <Link href={blogLink}>
                  <Button
                    variant="ghost"
                    className="p-0 m-0 hover:bg-gray-300 bg-none rounded-4xl"
                  >
                    <CommentSvg /> <span className="text-black">{100}</span>
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}
