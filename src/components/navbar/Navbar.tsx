"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { BiLoaderCircle } from "react-icons/bi";
import { ProfileMenu } from "./ProfileMenu";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Separator } from "@radix-ui/react-context-menu";

export default function Header() {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col sm:flex-row justify-between items-center px-5 h-14 sm:h-16">
      <Link href="/">
        <h2 className="font-bold text-xl">LOGO</h2>
      </Link>
      {initialLoading && status === "loading" ? (
        <BiLoaderCircle className="animate-spin" />
      ) : !session ? (
        <div className="__menu">
          <Button
            onClick={() => signIn("google")}
            className="rounded-4xl bg-purple-800 hover:bg-purple-900"
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="flex gap-3 justify-center items-center">
          <ProfileMenu imageLink={session.user?.image || ""} name={session.user?.name || ""} />
        </div>
      )}
    </div>
  );
}
