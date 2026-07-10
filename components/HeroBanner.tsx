import Image from "next/image";
import Link from "next/link";

const HeroBanner: React.FC = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link href="/signup" className="block cursor-pointer">
          <Image
            src="/Banner.webp"
            alt="Earn Big Returns"
            width={1200}
            height={400}
            className="w-full h-auto rounded-lg"
            priority
          />
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;
