import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchLandingHeroData,
  fetchLandingSections,
  type LandingHeroData,
  type LandingSectionData,
} from "../lib/landingData";

type PlaceholderSectionProps = LandingSectionData;

function PlaceholderSection({
  id,
  title,
  assignedGroup,
  statusLabel,
}: PlaceholderSectionProps) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-10">
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
        <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">
          {statusLabel}
        </p>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{assignedGroup}</p>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [hero, setHero] = useState<LandingHeroData | null>(null);
  const [sections, setSections] = useState<LandingSectionData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      try {
        const [heroData, sectionData] = await Promise.all([
          fetchLandingHeroData(),
          fetchLandingSections(),
        ]);

        if (!isCancelled) {
          setHero(heroData);
          setSections(sectionData);
        }
      } catch (loadError) {
        if (!isCancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load landing content."
          );
        }
      }
    };

    load();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center">
        <p className="text-sm text-gray-600">Loading landing page...</p>
      </div>
    );
  }

  const footerSection = sections.find((section) => section.id === "footer");
  const mainSections = sections.filter((section) => section.id !== "footer");

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-extrabold tracking-wide text-lg">BULSU COE</h1>
          <Link
            to="/departments"
            className="rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
          >
            Department Pages
          </Link>
        </div>
      </header>

      <main>
        <section id="hero" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="rounded-3xl bg-gradient-to-r from-[#f4efe3] via-[#ead9b5] to-[#d6b26f] p-8 md:p-12">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#6f4d12]">
              {hero.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black leading-tight text-[#2a1d0b] whitespace-pre-line">
              {hero.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-[#4a3721]">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={hero.primaryButtonHref}
                className="rounded-full bg-[#2a1d0b] px-5 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                {hero.primaryButtonLabel}
              </Link>
            </div>
          </div>
        </section>

        {mainSections.map((section) => (
          <PlaceholderSection key={section.id} {...section} />
        ))}
      </main>

      <footer id="footer" className="border-t bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500">
          {footerSection
            ? `${footerSection.statusLabel}: ${footerSection.assignedGroup}`
            : "Footer placeholder"}
        </div>
      </footer>
    </div>
  );
}
