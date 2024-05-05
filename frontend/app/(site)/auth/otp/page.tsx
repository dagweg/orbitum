"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function OtpPage() {
  const [otp, setOtp] = useState<string>();
  const router = useRouter();
  const otpRef = useRef<HTMLInputElement>(null);

  function handleOtpChange(s: string) {
    console.log(s);
    setOtp(s);

    if (s.length === 6) {
      router.push("/auth/login");
    }
  }

  function handleContinue() {
    // Verify here

    // TODO

    // Assuming the user is validated

    router.push("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full gap-1">
      <h1 className="font-bold text-4xl">Verify your account</h1>
      <h1>
        We&apos;ve sent you a one time password. Check your email at
        placeholder@gmail.com
      </h1>
      <div className="my-10">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(s) => handleOtpChange(s)}
          ref={otpRef}
        >
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
        </InputOTP>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => router.back()}>Go back</Button>
      </div>
    </div>
  );
}
