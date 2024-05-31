"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useRouter } from "next/navigation";
import Link from "@/app/components/link";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { getMappedZodErrors } from "@/lib/utils";
import Spinner from "@/app/components/spinner";
import { API_ORIGIN } from "@/app/config/apiConfig";
import { TLoginSchema } from "@/lib/types/schema";

type TLoginError = { [key in keyof TLoginSchema]?: z.ZodIssue };

export default function Login() {
  const form = useForm();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<TLoginError>();
  const router = useRouter();

  async function onSubmit() {
    setLoading(true);
    try {
      const loginResponse = await fetch(`${API_ORIGIN}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form.getValues()),
      });

      const loginData = await loginResponse.json();

      setErrors({});
      setLoading(false);

      // Handle cases
      switch (loginResponse.status) {
        case 200:
          toast({
            title: "Success",
            description: loginData.message,
          });
          router.push("/site/feed");
          break;
        case 401:
          toast({
            title: "Error",
            description: loginData.message,
            variant: "destructive",
          });
          break;
        case 400:
          const _errors = getMappedZodErrors(loginData);
          setErrors(_errors);
          break;
        default:
          setErrors({});
      }
    } catch (error) {
      console.error("Error in login fetch:", error);
    }
  }

  return (
    <div className="w-[450px] max-w-[500px] px-10 py-20 mx-auto rounded-lg">
      <h1 className="text-4xl font-bold  mb-4 font-lemonMilk flex w-full justify-center flex-col items-center">
        <span className="flex items-start">
          Orbitum<span className="font-light text-[11pt]">&trade;</span>
        </span>{" "}
        <span className="text-sm font-light">Login</span>
      </h1>
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
                <FormMessage>{errors?.email?.message}</FormMessage>
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
                <FormMessage>{errors?.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button type="submit" onClick={onSubmit}>
              {loading ? <Spinner /> : "Login"}
            </Button>
            <p>
              New to Orbitum? <Link href="/auth/register">Register</Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
