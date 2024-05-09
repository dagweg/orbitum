"use client";

import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import Link from "@/app/components/link";
import { z } from "zod";
import { TUserSchema, userSchemaValidator } from "@val/user.validation";
import { API_HOST } from "@/app/config/apiConfig";
import { useEffect, useState } from "react";
import { error } from "console";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/ui/phone-input";
import { Loader } from "lucide-react";
import Spinner from "@/app/components/spinner";

type TRegisterError = { [key in keyof TUserSchema]?: z.ZodIssue };

function Register() {
  const schema = userSchemaValidator;
  const form = useForm<TUserSchema>({
    defaultValues: {
      userName: "Dagmawi",
      firstName: "Dagmawi",
      lastName: "Tefera",
      passWord: "abcd1234@A",
      phoneNumber: "0993508272",
      confirmPassWord: "abcd1234@A",
      email: "dagtef@",
    },
  });
  const router = useRouter();

  const [errors, setErrors] = useState<TRegisterError>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  function register() {
    setLoading(true);

    const formValues = form.getValues();
    fetch(`${API_HOST}/api/v1/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then(async (res) => {
        const data = await res.json();

        setLoading(false);

        if (res.ok) {
          router.push("/auth/otp");
        } else {
          const errz: { [key: string]: z.ZodIssue } = {};
          for (const error of data.errors) {
            const e = error as z.ZodIssue;
            errz[(error as z.ZodIssue).path[0] as string] = e;
            console.log(error);
          }
          if (formValues.passWord !== formValues.confirmPassWord)
            errz["confirmPassWord"].message = "Passwords don't match";
          setErrors(errz);
        }
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }

  return (
    <div className="flex flex-col items-center mx-auto h-full p-4 w-full sm:w-fit">
      <div className="w-full sm:w-fit border-2  duration-300 border-neutral-200 p-10 mx-auto rounded-md">
        <h1 className="text-4xl font-bold  mb-4">Register</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(register)}
            className="relative flex flex-col px-2  woverflow-y-scroll no-scrollbar"
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage>{errors?.userName?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="Firstname" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage>{errors?.firstName?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input placeholder="Lastname" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage>{errors?.lastName?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your email won&apos;t be displayed
                  </FormDescription>
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
            <FormField
              control={form.control}
              name="confirmPassWord"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors?.confirmPassWord?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phonenumber</FormLabel>
                  <FormControl>
                    <PhoneInput
                      value={field.value as string}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage>{errors?.phoneNumber?.message}</FormMessage>
                </FormItem>
              )}
            ></FormField>
            <div className="flex flex-col gap-2">
              <Button type="submit" onClick={register}>
                {loading ? <Spinner /> : "Register"}
              </Button>
              <p>
                Already have an account? <Link href="/auth/login">Login</Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Register;
