import Link from "next/link";

interface CardSectionProps {
  title: string;
  description: string;
}

const CardSection: React.FC<CardSectionProps> = ({
  title,
  description,
}) => {
  return (
    <section className="text-center max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {description}
      </p>

      <Link
        href="/signup"
        className="inline-block bg-[#C0005A] hover:bg-red-800 transition text-white px-6 py-2 rounded-md text-sm"
      >
        Apply Now
      </Link>
    </section>
  );
};

export default CardSection;
