import Image from "next/image";

const HeroBanner: React.FC = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Image
          src="/Banner.webp"
          alt="Earn Big Returns"
          width={1200}
          height={400}
          className="rounded-lg object-cover w-full"
          priority
        />
      </div>
    </section>
  );
};

export default HeroBanner;
