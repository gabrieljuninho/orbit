"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SignUpSchema } from "@/schemas/auth";

import { createUser } from "@/features/auth/services/auth";

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

const SignUpForm = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Wrapper
      title="Team Up, Stay Connected"
      description="Build your team, share ideas, and make progress all in one space"
      type="sign up"
    >
      {mutation?.data?.status === 500 ||
        mutation?.data?.status === 400 ||
        (mutation?.data?.status === 409 && (
          <Alert variant={"destructive"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{mutation.data.message}</AlertDescription>
          </Alert>
        ))}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="orbit123"
                    autoComplete="off"
                    className="text-sm"
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    disabled={mutation.isPending}
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
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full text-sm"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : "Create an account"}
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
};

export default SignUpForm;
