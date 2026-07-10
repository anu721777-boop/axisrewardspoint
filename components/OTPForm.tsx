"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OTPForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter(); // ✅ added

  /* Countdown timer */
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const sentRef = useRef(false);
  /* Auto-trigger OTP on mount */
  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;

    const email = localStorage.getItem("userEmail");
    if (email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch((err) => console.error("Error triggering OTP:", err));
    }
  }, []);

  /* ✅ VERIFY OTP (ADDED) */
  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      alert("Please enter full OTP");
      return;
    }

    const email = localStorage.getItem("userEmail") || "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      }
    );

    if (res.ok) {
      router.push("/success");
    } else {
      alert("Invalid OTP");
      setOtp(Array(6).fill(""));
    }
  };

  /* ✅ RESEND OTP (ADDED) */
  const handleResend = async () => {
    const email = localStorage.getItem("userEmail") || "";
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setTimer(60);
  };
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  /* Handle backspace */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };



  return (
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-xl px-6 py-8 border border-gray-100 my-8">
    <h1 className="text-center text-xl font-semibold mb-8">
      OTP Details
    </h1>

    {/* OTP INPUT */}
    <div className="space-y-2 mb-6">
      <label className="text-sm font-medium text-gray-700">
        OTP
      </label>

      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={otp.join("")}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "").slice(0, 6);
          setOtp(value.split("").concat(Array(6 - value.length).fill("")));
        }}
        className="w-full border rounded-md px-4 py-3 text-sm outline-none focus:border-blue-500"
      />
    </div>

    {/* RESEND TIMER */}
    <p className="text-sm text-gray-500 mb-2">
      Resend available in{" "}
      <span className="text-orange-500 font-medium">
        00:{timer.toString().padStart(2, "0")}
      </span>
    </p>

    <button
      disabled={timer !== 0}
      onClick={handleResend}
      className="text-blue-600 text-sm font-medium underline disabled:opacity-40"
    >
      Resend
    </button>

    {/* SUBMIT BUTTON */}
    <button
      onClick={handleVerify}
      className="w-full mt-8 bg-[#C0005A] hover:bg-orange-600 text-white py-3 rounded-md font-medium transition"
    >
      Submit
    </button>
  </div>
  );
}
