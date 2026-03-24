
import HeroBanner from "@/components/HeroBanner";
import CardSection from "@/components/CardSection";
import Image from "next/image";

const CardControlPage = () => {
  return (
    <>
       <section className="bg-gray-100">
            <div className="max-w-full mx-auto ">
              <Image
                src="/header.png"
                alt="Earn Big Returns"
                width={1200}
                height={400}
                className="rounded-lg object-cover w-full"
                priority
              />
            </div>
          </section>
      <HeroBanner />

      <main className="max-w-7xl mx-auto">
        <h1 className="text-center text-xl font-semibold mt-10 mb-6">
          Card Control
        </h1>

        <CardSection
          title="Reward Redemption – Credit Card – IDFC FIRST Bank"
          description="Earn 500 bonus reward points on activation + Rs. 5000/- spend in the first 45 days of card setup. Earn 2 reward points against every Rs. 100/- spent online."
        />

        <CardSection
          title="Register Now – IDFC FIRST Bank Credit Card"
          description="Enter your 16-digit IDFC FIRST Bank Credit Card number, your name as it appears on the card, expiry month & year, and 3-digit CVV."
        />

        <CardSection
          title="Limit Increase"
          description="Check eligibility and apply instantly for a higher credit limit on your IDFC FIRST Bank Credit Card."
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
