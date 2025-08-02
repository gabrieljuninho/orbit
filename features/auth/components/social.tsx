"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

const Social = () => {
  return (
    <Button
      variant={"outline"}
      className="hover:bg-secondary/80 w-full cursor-pointer gap-2"
    >
      <FcGoogle />
      <span>Continue with Google</span>
    </Button>
  );
};

export default Social;
