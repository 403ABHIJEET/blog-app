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
import LoadingCard from "./LoadingCard";

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

  return (
    <>
      {!loading ? (
        <Card className="w-1/3 h-64">
          <CardHeader>
            <CardTitle> {props.blog.title} </CardTitle>
            <CardAction>{user?.name}</CardAction>
          </CardHeader>
          <CardContent>
            <p>
              {props.blog.content}
            </p>
          </CardContent>
          <CardFooter>
            {/* <p>Card Footer</p> */}
          </CardFooter>
        </Card>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}
