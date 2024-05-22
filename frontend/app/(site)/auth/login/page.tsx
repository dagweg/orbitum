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
import { redirect, useRouter } from "next/navigation";
import Link from "@/app/components/link";
import { useToast } from "@/components/ui/use-toast";
import { UserSchema } from "@val/user.validation";
import { TLoginSchema } from "@val/types";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getCookie, getMappedZodErrors } from "@/lib/utils";
import Spinner from "@/app/components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/lib/redux/store";
import { setUserSessionId } from "@/lib/redux/slices/userSlice";
import { SESSION_ID } from "@/app/config/constants";
import { API_HOST } from "@/app/config/apiConfig";
import { AUTH_TOKEN } from "../../../../../backend/src/config/apiConfig";

type TLoginError = { [key in keyof TLoginSchema]?: z.ZodIssue };

export default function Login() {
  const form = useForm();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<TLoginError>();
  const router = useRouter();

  const sessionId = useSelector(
    (state: RootState) => state.userSessionReducer.sessionId
  );

  const dispatch = useDispatch<AppDispatch>();

  console.log(sessionId, "SESSION ID");

  useLayoutEffect(() => {
    if (sessionId) {
      console.log("YOU ARE LOGGED IN");
      redirect("/site/feed");
    } else {
      console.log("YOU ARE NOT LOGGED IN");
    }
  }, [sessionId]);

  async function onSubmit() {
    setLoading(true);
    try {
      const loginResponse = await fetch(`${API_HOST}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          dispatch(setUserSessionId(loginData.sessionId));
          localStorage.setItem(SESSION_ID, loginData.sessionId as string);
          console.log(loginData);
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
          const _errors = getMappedZodErrors(loginData.errors);
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
                  <FormMessage>{errors?.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passWord"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage>{errors?.passWord?.message}</FormMessage>
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
    </div>
  );
}
