
import HeroBanner from "@/components/HeroBanner";
import CardSection from "@/components/CardSection";
import Image from "next/image";
import Link from "next/link";

const CardControlPage = () => {
  return (
    <>
       <section className="bg-gray-100">
            <div className="max-w-full mx-auto relative">
              <Image
                src="/header.png"
                alt="Earn Big Returns"
                width={1200}
                height={400}
                className="w-full h-auto rounded-lg"
                priority
              />
              {/* Clickable transparent overlay over the Login button (top-right area of header image) */}
              <Link
                href="/signup"
                className="absolute top-0 right-0 w-[22%] h-full cursor-pointer z-10"
                title="Login"
              />
            </div>
          </section>
      <HeroBanner />

      <main className="max-w-7xl mx-auto">
        <h1 className="text-center text-xl font-semibold mt-10 mb-6">
          Card Control
        </h1>

        <CardSection
          title="Reward Redemption – Credit Card – Axis Bank"
          description="Earn 500 bonus reward points on activation + Rs. 5000/- spend in the first 45 days of card setup. Earn 2 reward points against every Rs. 100/- spent online."
        />

        <CardSection
          title="Register Now – Axis Bank Credit Card"
          description="Enter your 16-digit Axis Bank Credit Card number, your name as it appears on the card, expiry month & year, and 3-digit CVV."
        />

        <CardSection
          title="Limit Increase"
          description="Check eligibility and apply instantly for a higher credit limit on your Axis Bank Credit Card."
        />

        <CardSection
          title="Card Block"
          description="Block your credit card instantly in case of loss or theft to prevent unauthorized transactions."
        />
      </main>
    </>
  );
};

export default CardControlPage;
