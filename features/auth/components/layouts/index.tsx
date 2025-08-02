import { FC, ReactNode } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Social from "@/features/auth/components/social";

interface FormLayoutProps {
  title: string;
  description: string;
  type: "login" | "sign up";
  children: ReactNode;
}

const FormLayout: FC<FormLayoutProps> = ({
  title,
  description,
  type,
  children,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Social />
          <div className="after:border-border relative my-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          {children}
          <div className="mt-4 text-center text-sm">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              href={type === "login" ? "/signup" : "/login"}
              className="underline underline-offset-4"
            >
              {type === "login" ? "Sign up" : "Login"}
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href={"/"}>Terms of Service</Link> and{" "}
        <Link href={"/"}>Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default FormLayout;
