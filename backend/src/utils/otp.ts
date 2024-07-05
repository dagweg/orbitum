export function generateOTP(
  len: number = 6,
  hours: number = 7
): { otp: string; otpExpiry: Date } {
  let otp: string = "";

  for (let i = 0; i < len; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  const otpExpiry: Date = new Date(Date.now() + hours * 60 * 60 * 1000);
  return { otp, otpExpiry };
}
