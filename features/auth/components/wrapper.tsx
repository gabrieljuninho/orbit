import { FC } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Social from "@/features/auth/components/social";

import { PropsWithChildren } from "@/types/components";

type TWrapper = {
  title: string;
  description: string;
  type: "sign up" | "login";
} & PropsWithChildren;

const Wrapper: FC<TWrapper> = ({ title, description, type, children }) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {children}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Social />
        <div className="text-center text-sm">
          {type === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <Link
                href={"/auth/sign-up"}
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href={"/auth/login"}
                className="underline underline-offset-4"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Wrapper;
