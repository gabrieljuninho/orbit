import { FC } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PropsWithChildren } from "@/types";

interface IWrapper extends PropsWithChildren {
  title: string;
  description: string;
  type: "sign up" | "login";
}

const Wrapper: FC<IWrapper> = ({ title, description, type, children }) => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {children}
          {type === "login" ? (
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href={"/auth/sign-up"}
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href={"/auth/login"}
                className="underline underline-offset-4"
              >
                Login
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href={"#"}>Terms of Service</Link> and{" "}
        <Link href={"#"}>Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default Wrapper;
