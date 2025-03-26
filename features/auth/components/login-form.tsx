"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { LoginSchema } from "@/schemas/auth";

import { login } from "@/features/auth/actions/login";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Spinner from "@/features/auth/components/spinner";
import Wrapper from "@/features/auth/components/wrapper";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const urlParams = useSearchParams();
  const callBackUrl = urlParams.get("callbackUrl");
  const errorUrlParam =
    urlParams.get("error") === "OAuthAccountNotLinked"
      ? "This account is already linked to a user. Please sign in with a different account."
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values, callBackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();

            toast.error(data.error);
          }
        })
        .catch(() => {
          toast.error("Something went wrong.");
        });
    });
  };

  return (
    <Wrapper
      title="Access Your Workspace"
      description="Log in to collaborate, create, and achieve more with your team"
      type="login"
    >
      {errorUrlParam && (
        <Alert variant={"destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorUrlParam}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="orbit@example.com"
                    autoComplete="off"
                    className="text-sm"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="********"
                    autoComplete="off"
                    className="text-sm"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-sm" disabled={isPending}>
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
