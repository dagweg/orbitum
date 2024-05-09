"use client";

import Spinner from "@/app/components/spinner";
import { API_HOST } from "@/app/config/apiConfig";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ToastProvider } from "@radix-ui/react-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function OtpPage() {
  const { toast } = useToast();
  const [otp, setOtp] = useState<string>();
  const router = useRouter();
  const otpRef = useRef<HTMLInputElement>(null);
  const goBackRef = useRef<HTMLButtonElement>(null);
  const resendRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();

  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`${API_HOST}/api/v1/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: params.get("jwt") }),
    }).then(async (res) => {
      const data = await res.json();
      setEmail(data.email);
    });
  }, [params]);

  function handleOtpChange(s: string) {
    console.log(s);
    setOtp(s);

    if (s.length === 6) {
      console.log(otp);
      setLoading(true);
      goBackRef.current?.setAttribute("disabled", "");
      resendRef.current?.setAttribute("disabled", "");

      setTimeout(() => {
        setLoading(false);
        goBackRef.current?.removeAttribute("disabled");
        resendRef.current?.removeAttribute("disabled");
      }, 2000);
      fetch(`${API_HOST}/api/v1/otp/`).then(async (res) => {
        const data = await res.json();
        setTimeout(() => {
          setLoading(false);
          goBackRef.current?.removeAttribute("disable");
          resendRef.current?.removeAttribute("disable");
        }, 2000);

        if (res.ok) {
          // Registration successful. Login
        } else {
          // Handle invalid otp
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
    toast({
      description:
        "We have resent an OTP please check your email and try again.",
    });

    fetch(`${API_HOST}/api/v1/user/otp`).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        // OTP sent
      } else {
        // Handle error
      }
    });
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
          onChange={(s) => handleOtpChange(s)}
          ref={otpRef}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
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
      <ToastProvider>
        <Toast>Hello</Toast>
      </ToastProvider>
    </div>
  );
}
