import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { AuthLayout } from "@/components/auth-layout";
import { type SignInValues, signInSchema } from "@/lib/validations/auth";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/auth";

export default function SignIn() {
  const [isPending, startTransition] = useTransition();
  const login = useLogin();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: SignInValues) {
    startTransition(() => {
      login.mutate({
        ...data,
      });
    });
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-muted-foreground">
            Enter your email below to sign in to your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Button variant="link" className="p-0" asChild>
                      <Link to="/recover">Recover Wallet</Link>
                    </Button>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <span className="text-muted-foreground">
            Don&apos;t have an account?{" "}
          </span>
          <Button variant="link" className="p-0" asChild>
            <Link to="/sign-up">Sign up</Link>
          </Button>
          {login.error && (
            <p className="text-sm font-medium text-red-500 text-center">
              {login.error.response?.data?.error}
            </p>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
