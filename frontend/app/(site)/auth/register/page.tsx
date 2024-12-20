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
import { API_ORIGIN } from "@/app/config/apiConfig";
import { useRef, useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import Spinner from "@/app/components/spinner";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { getMappedZodErrors } from "@/lib/utils";
import { TUserSchema } from "@/lib/types/schema";
import { TZodErrors } from "@/lib/types/types";
import Image from "next/image";

type TRegisterError = { [key in keyof TUserSchema]?: z.ZodIssue };

function Register() {
  const form = useForm<TUserSchema>({
    defaultValues: {
      userName: "Dagmawi",
      firstName: "Dagmawi",
      lastName: "Tefera",
      password: "abcd1234@A",
      confirmPassWord: "abcd1234@A",
      email: "dagtef@gmail.com",
    },
  });
  const router = useRouter();
  const [errors, setErrors] = useState<TRegisterError>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const dialogRef = useRef<HTMLButtonElement>(null);
  const tokenRef = useRef("");

  function register() {
    setLoading(true);

    const formValues = form.getValues();

    fetch(`${API_ORIGIN}/api/v1/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then(async (res) => {
        const data = await res.json();
        setLoading(false);
        tokenRef.current = data.token;
        setErrors({});

        let errz: TZodErrors = {};

        switch (res.status) {
          case 200:
            redirectToOtpPage();
            break;
          case 409:
            // toast({
            //   title: "An error has occured",
            //   description: data.message,
            // });
            if (!data.verified) {
              redirectToOtpPage();
            }
            errz["email"] = {
              message: data.errors.email,
              code: "custom",
              path: ["email"],
            };
            errz["userName"] = {
              message: data.errors.username,
              code: "custom",
              path: ["userName"],
            };

            console.log(errz);
            setErrors(errz);
            break;
          case 400:
            errz = getMappedZodErrors(data);
            if (errz["confirmPassword"]) {
              if (formValues.password !== formValues.confirmPassWord)
                errz["confirmPassWord"].message = "Passwords don't match";
              else errz["confirmPassWord"].message = "";
            }
            console.log(errz);
            setErrors(errz);
            break;
          default:
            break;
        }
      })
      .catch((e: Error) => {});
  }

  const redirectToOtpPage = () => {
    router.push(`/auth/otp?jwt=${tokenRef.current}`);
  };

  return (
    <div className="w-full sm:min-w-fit sm:w-[450px]   my-4 duration-300  p-10 mx-auto rounded-md">
      <h1 className="text-4xl font-bold  mb-4 font-lemonMilk flex w-full justify-center flex-col items-center">
        <Image src={"/logo/logo.ico"} alt="" width={65} height={65} />
        <span className="tracking-[6pt] text-sm opacity-60">Orbitum</span>
        {/* <span className="flex items-start tracking-wider">
          Orbitum<span className="font-light text-[11pt]">&trade;</span>
        </span>{" "}
        <span className="text-sm font-light">Register</span> */}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(register)}
          className="relative flex flex-col px-2 gap-3  overflow-y-scroll no-scrollbar"
        >
          <span className="text-3xl opacity-70 font-bold">Register</span>
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
          {/* <FormField
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
            ></FormField> */}
          <div className="flex flex-col gap-2 my-5">
            <Button type="button" onClick={register}>
              {loading ? <Spinner /> : "Register"}
            </Button>
            <p>
              Already have an account? <Link href="/auth/login">Login</Link>
            </p>
          </div>
        </form>
      </Form>
      <div className="sr-only">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" ref={dialogRef}>
              Show Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                An unverified account has been found!
              </AlertDialogTitle>
              <AlertDialogDescription>
                Click continue if you want us to send you an otp so that you get
                verified and start using Orbitum.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={redirectToOtpPage}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default Register;
