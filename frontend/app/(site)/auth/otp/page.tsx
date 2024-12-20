"use client";

import Spinner from "@/app/components/spinner";
import { API_ORIGIN } from "@/app/config/apiConfig";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
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
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function OtpPage() {
  const { toast } = useToast();
  const [otp, setOtp] = useState<string>();
  const router = useRouter();
  const otpRef = useRef<HTMLInputElement>(null);
  const goBackRef = useRef<HTMLButtonElement>(null);
  const resendRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  // const params = useSearchParams();
  // const token = params.get("jwt");
  const [token, setToken] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const dialogRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(new URLSearchParams(window.location.search).get("jwt"));
    }
  }, []);

  /**
   *  Handling token verification & authorization
   */
  useLayoutEffect(() => {
    async function fetchToken() {
      const response = await fetch(`${API_ORIGIN}/api/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      console.log(response);

      const data = await response.json();

      if (data.emailVerified) {
        router.push("/auth/login");
      }
      setEmail(data.email);
    }

    fetchToken();
  }, [router, token]);

  /**
   * Handle Otp Submit validation
   * @param inputOtp
   */
  function handleOtpChange(inputOtp: string) {
    setOtp(inputOtp);

    if (inputOtp.length === 6) {
      setLoading(true);
      goBackRef.current?.setAttribute("disabled", "");
      resendRef.current?.setAttribute("disabled", "");

      fetch(`${API_ORIGIN}/api/v1/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          inputOtp,
        }),
      }).then(async (res) => {
        const data = await res.json();
        setLoading(false);
        goBackRef.current?.removeAttribute("disabled");
        resendRef.current?.removeAttribute("disabled");

        switch (res.status) {
          case 401:
            toast({
              description: "You have entered a wrong OTP. Please try again",
              variant: "destructive",
            });
            break;
          case 200:
            setVerified(true);
            setTimeout(() => {
              toast({
                description: "Verification Complete.",
              });
              dialogRef.current?.click();
            }, 1000);
        }
      });
    }
  }

  function handleContinue() {
    // Verify here

    // TODO

    // Assuming the user is validated

    router.push("/auth/login");
  }

  function resendOTP() {
    fetch(`${API_ORIGIN}/api/v1/otp/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        toast({
          description:
            "We have resent an OTP please check your email and try again.",
        });
      } else {
        toast({
          description:
            "We were unable to send you an OTP at this time. Please try again later.",
          variant: "destructive",
        });
      }
    });
  }

  function redirectToLogin() {
    router.push("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full gap-4">
      <h1 className="font-bold text-4xl">Verify your account</h1>
      <h1>
        We&apos;ve sent you a one time password. Check your email at{" "}
        <span className="font-bold">{email}</span>
      </h1>
      <div className="h-[100px] flex items-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(inputOtp) => handleOtpChange(inputOtp)}
          ref={otpRef}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className={cn(verified && "border-green-500 bg-green-50")}
                />
                <InputOTPSlot
                  index={1}
                  className={cn(verified && "border-green-500 bg-green-50")}
                />
                <InputOTPSlot
                  index={2}
                  className={cn(verified && "border-green-500 bg-green-50")}
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  className={cn(verified && "border-green-500 bg-green-50")}
                />
                <InputOTPSlot
                  index={4}
                  className={cn(verified && "border-green-500 bg-green-50")}
                />
                <InputOTPSlot
                  index={5}
                  className={cn(verified && "border-green-500 bg-green-50")}
                />
              </InputOTPGroup>
            </>
          )}
        </InputOTP>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-3">
          <Button onClick={() => router.back()} ref={goBackRef}>
            Go back
          </Button>
        </div>
        <div className="flex gap-3">
          <Button onClick={resendOTP} variant={"outline"} ref={resendRef}>
            Resend OTP
          </Button>
        </div>
      </div>
      <div className="sr-only">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" ref={dialogRef}>
              Show Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Verification Successful!</AlertDialogTitle>
              <AlertDialogDescription>
                You can now chat, call & meet people around the world. Have fun
                & stay safe out there.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={redirectToLogin}>
                Login
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
