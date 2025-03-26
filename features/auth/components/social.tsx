/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const urlParams = useSearchParams();
  const callBackUrl = urlParams.get("callbackUrl");

  const handleClick = (provider: "github" | "google") => {
    signIn(provider), { callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT };
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() => handleClick("google")}
      >
        <FcGoogle />
        Google
      </Button>
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() => handleClick("github")}
      >
        <FaGithub />
        Github
      </Button>
    </div>
  );
};

export default Social;
