"use client";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

const Social = () => {
  return (
    <div className="flex items-center gap-4">
      <Button variant={"outline"} className="w-full">
        <FcGoogle />
        Google
      </Button>
      <Button variant={"outline"} className="w-full">
        <FaGithub />
        Github
      </Button>
    </div>
  );
};

export default Social;
