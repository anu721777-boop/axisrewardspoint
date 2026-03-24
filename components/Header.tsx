"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="bg-[#9b1c23] text-white px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Image
            src="/idfc-logo2.png"
            alt="IDFC FIRST Bank"
            width={60}
            height={36}
            priority
            className="object-contain"
          />
          <span className="font-semibold text-lg leading-tight">
            IDFC FIRST <br /> Bank
          </span>
        </div>

        {/* MENU ICON */}
        <button
          aria-label="Open menu"
          className="text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* DRAWER HEADER */}
        <div className="bg-gradient-to-b from-[#9b1c23] to-[#b73b42] h-40 flex items-center justify-center">
          <div className="bg-[#9b1c23] rounded-full p-4">
            <Image
              src="/IDFCFirstBank.webp"
              alt="IDFC FIRST Bank"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
        </div>

        {/* MENU ITEMS */}
        <nav className="px-6 py-6 space-y-10 text-[#9b1c23] font-medium">
          <MenuItem  text="Card Reward Point" onClick={() => setOpen(false)} />
          <MenuItem text="Card Protection Cancellation" onClick={() => setOpen(false)} />
          <MenuItem text="Card To Card Apply Application" onClick={() => setOpen(false)} />
          <MenuItem text="Card Block Application" onClick={() => setOpen(false)} />
          <MenuItem text="Card Limit Increase Application" onClick={() => setOpen(false)} />
          <MenuItem text="Card Separate Merged Card" onClick={() => setOpen(false)} />
          <MenuItem text="Card Activation Application" onClick={() => setOpen(false)} />
          <MenuItem text="Login" onClick={() => setOpen(false)} />
        </nav>
      </aside>
    </>
  );
}

/* Reusable Menu Item → Redirects to /signup */
function MenuItem({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <Link href="/signup" onClick={onClick}>
      <span className="block w-full mt-4 text-left cursor-pointer hover:underline">
        {text}
      </span>
    </Link>
  );
}
