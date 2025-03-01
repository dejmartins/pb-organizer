"use client";
import VerifyEmailForm from "@/app/ui/auth/verify-form";
import { loginWithEmail } from "@/services/auth-service";
import { isValidEmail } from "@/shared/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [email, setemail] = useState("");
  const router = useRouter();

  const handleResend = (e: any) => {
    const queryApi = () => {
      if (email.length && isValidEmail(email)) {
        loginWithEmail({ username: email }).subscribe({
          next: (res) => {
            toast.success("Otp sent!");
          },
          error: (msg) => {
            toast.error(msg.message);
          },
          complete: () => {},
        });
      }
    };
    queryApi();
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      const tempemail = localStorage.getItem("tempemail");
      if (!tempemail) {
        router.back();
      } else {
        setemail(tempemail);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-between text-center bg-[var(--pb-c-soft-grey)] h-full rounded-[40px] p-8 py-12 lg:p-12 text-[#080D18]">
      <div>
        <h3 className="text-[29px] md:text-[32px] font-[700] leading-[35.34px] md:leading-[42.34px]">
          Verify Email Address
        </h3>
        <p className="text-[15px] leading-[20.81px] md:text-[18px] font-[400] md:leading-[23.81px]">
          A six digit code has been sent to your email address
        </p>
      </div>

      <div className="w-full">
        <div className="my-10">
          <p className="text-[15px] md:text-[18px] font-[600]">{email}</p>
          <span
            className="underline underline-offset-4 text-[var(--pb-c-red)] cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            Change Email
          </span>
        </div>

        <VerifyEmailForm />
      </div>

      <p className="text-[15px] leading-[20.81px] md:text-[18px] font-[400] md:leading-[23.81px] mt-6">
        Didn&apos;t get code?{" "}
        <span
          className="text-[var(--pb-c-red)] font-[500] underline underline-offset-4 cursor-pointer"
          onClick={handleResend}
        >
          Resend Code
        </span>
      </p>
    </div>
  );
}
