"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/idfc-1.jpeg", "/idfc-2.jpeg", "/idfc-3.jpeg"];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] overflow-hidden rounded-xl">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt="IDFC Credit Card"
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
