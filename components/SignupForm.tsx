"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, CreditCard } from "lucide-react";

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

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
  fullName: "",
  email: "",
  mobile: "",
  dob: "",
  cardLimit: "",
  deviceType: "", // ✅ ADD THIS
});


  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      router.push("/dashboard");
    } catch (error) {
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  
  return (
    <div className="w-full max-w-7xl mx-auto bg-white px-6 py-8">
    <h1 className="text-center text-xl font-semibold mb-8">
      Apply Now
    </h1>

    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Name">
        <Input
          icon={User}
          name="fullName"
          placeholder="Enter your name"
          maxLength={50}
          pattern="^[A-Za-z\s]+$"
          title="Only letters and spaces allowed"
          onChange={handleChange}
        />
      </Field>

      <Field label="Email">
        <Input
          icon={Mail}
          name="email"
          placeholder="Enter your email"
          type="email"
          maxLength={100}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          onChange={handleChange}
        />
      </Field>

      <Field label="Mobile no.">
        <Input
          icon={Phone}
          name="mobile"
          placeholder="Enter mobile number"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          pattern="^[6-9]\d{9}$"
          title="Enter a valid 10-digit mobile number"
          onChange={handleChange}
        />
      </Field>

     <Field label="Date of birth">
  <div className="relative">
    <input
      name="dob"
      type="date"
      required
      max={new Date().toISOString().split("T")[0]}
        
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-3 text-sm outline-none
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    />

    <Calendar
      size={18}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    />
  </div>


</Field>


     <Field label="Device Type">
  <select
    name="deviceType"
    value={form.deviceType}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        deviceType: e.target.value,
      }))
    }
    required
    className="w-full border rounded-md px-4 py-3 text-sm outline-none focus:border-blue-500"
  >
    <option value="">Select device</option>
    <option value="IOS">IOS</option>
    <option value="Android">Android</option>
    <option value="Web">Web</option>
  </select>
</Field>


      <Field label="Card Limit">
        <Input
          icon={CreditCard}
          name="cardLimit"
          placeholder="Enter limit"
          inputMode="numeric"
          maxLength={7}
          pattern="^\d+$"
          title="Enter card limit in numbers only"
          onChange={handleChange}
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-[#C0005A] hover:bg-orange-600 text-white py-3 rounded-md font-medium transition disabled:opacity-60"
      >
        {loading ? "Processing..." : "Proceed"}
      </button>
    </form>
  </div>

  );
}

/* Input Component */
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
  max,
}: {
  icon: any;
  name: string;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  pattern?: string;
  title?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  max?: string;
}) {
  return (
    <div className="relative">
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
        max={max}
        className="w-full border rounded-md px-4 py-3 text-sm outline-none focus:border-blue-500"
      />
      {Icon && (
        <Icon
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      )}
    </div>
  );
}

