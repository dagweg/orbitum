"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { env } from "process";
import { useRouter } from "next/navigation";
import Link from "@/app/components/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Login() {
  const form = useForm();
  const router = useRouter();

  function onSubmit() {
    fetch(`https://localhost:5000/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function login() {
    router.push("/site/");
  }

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="min-w-[400px] max-w-[500px] border-2 border-neutral-400 p-10 mx-auto rounded-lg">
        <h1 className="text-4xl font-bold  mb-4">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button type="submit" onClick={login}>
                Login
              </Button>
              <p>
                Are you new here? <Link href="/auth/register">Register</Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
