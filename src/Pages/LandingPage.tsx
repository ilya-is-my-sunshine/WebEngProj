import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { landingPageData, type LandingPageData } from "../data/landing";
import {
  loadLandingDraft,
  mergeLandingWithOverrides,
} from "../lib/landingAdmin";

type Sections = LandingPageData["sections"];

function MissionVisionSection({ data }: { data: Sections["missionVision"] }) {
  return (
    <section id="mission-vision" className="max-w-6xl mx-auto px-6 py-16">
      <div className="relative">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sm font-bold tracking-[0.2em] text-orange-500 uppercase mb-2">
            COLLEGE OF ENGINEERING
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a90000] to-orange-500 tracking-tighter">
            {data.title}
          </h2>
        </div>

        {/* Two-Column Grid for Separate Hover Effects */}
        <div className="grid md:grid-cols-2 gap-8 relative z-10">

          {/* Mission Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 md:p-10 transition-all duration-500 hover:-translate-y-3 hover:border-orange-300
      hover:shadow-[0_20px_50px_rgba(169,0,0,0.12)]">
            {/* Lively Animated Background Glow */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#a90000] opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-20 pointer-events-none"></div>

            {/* Top Border Animation */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#a90000] to-orange-500 transform scale-x-0 transition-transform duration-500 origin-left
      group-hover:scale-x-100 rounded-t-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-1.5 bg-[#a90000] rounded-full"></div>
                <h3 className="text-3xl font-black text-gray-900 group-hover:text-[#a90000] transition-colors duration-300 uppercase tracking-widest">
                  Mission
                </h3>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed font-medium transition-colors duration-300 group-hover:text-gray-900">
                {data.missionText}
              </p>
            </div>

            {/* Decorative Icon or Watermark */}
            <div className="absolute bottom-4 right-6 text-8xl font-black text-gray-50 select-none transition-colors duration-500 group-hover:text-orange-50">
              M
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 md:p-10 transition-all duration-500 hover:-translate-y-3 hover:border-orange-300
      hover:shadow-[0_20px_50px_rgba(234,88,12,0.12)]">
            {/* Lively Animated Background Glow */}
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-orange-400 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-20
      pointer-events-none"></div>

            {/* Top Border Animation */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-[#a90000] transform scale-x-0 transition-transform duration-500 origin-right
      group-hover:scale-x-100 rounded-t-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-1.5 bg-orange-500 rounded-full"></div>
                <h3 className="text-3xl font-black text-gray-900 group-hover:text-orange-600 transition-colors duration-300 uppercase tracking-widest">
                  Vision
                </h3>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed font-medium transition-colors duration-300 group-hover:text-gray-900">
                {data.visionText}
              </p>
            </div>

            {/* Decorative Icon or Watermark */}
            <div className="absolute bottom-4 right-6 text-8xl font-black text-gray-50 select-none transition-colors duration-500 group-hover:text-red-50">
              V
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function DepartmentGridSection({ data }: { data: Sections["departmentGrid"] }) {
  return (
    <section id="department-grid" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <p className="mt-3 text-sm text-gray-600">{data.introText}</p>
      </SectionCard>
    </section>
  );
}

function NewsSection({ data }: { data: Sections["news"] }) {
  return (
    <section id="news" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <div className="mt-3 space-y-1 text-sm text-gray-600">
          {data.items.map((item, idx) => (
            <p key={idx}>
              {item.date} - {item.title}
            </p>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}

function FacilitiesSection({ data }: { data: Sections["facilities"] }) {
  return (
    <section id="facilities" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <div className="mt-3 space-y-1 text-sm text-gray-600">
          {data.highlights.map((item, idx) => (
            <p key={idx}>- {item}</p>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}

function StatisticsSection({ data }: { data: Sections["statistics"] }) {
  return (
    <section id="statistics" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-700">
          {data.stats.map((item, idx) => (
            <span key={idx}>
              <strong>{item.value}</strong> {item.label}
            </span>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}

function ContactSection({ data }: { data: Sections["contact"] }) {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <p className="mt-3 text-sm text-gray-600">Email: {data.email}</p>
        <p className="text-sm text-gray-600">Phone: {data.phone}</p>
        <p className="text-sm text-gray-600">Address: {data.address}</p>
      </SectionCard>
    </section>
  );
}

function LandingFooterSection({ data }: { data: Sections["footer"] }) {
  return (
    <footer id="footer" className="border-t bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500">
        <p>
          {data.statusLabel}: {data.assignedGroup}
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          {data.links.map((link, idx) => (
            <a key={idx} href={link.href} className="text-sm text-gray-700 underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SectionCard({
  data,
  children,
}: { data: { id: string; title: string; assignedGroup: string; statusLabel: string }; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
      <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">
        {data.statusLabel}
      </p>
      <h2 className="mt-3 text-2xl font-bold text-gray-900">{data.title}</h2>
      <p className="mt-2 text-sm text-gray-600">{data.assignedGroup}</p>
      {children}
    </div>
  );
}

export default function LandingPage() {
  const isPreviewMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("preview") === "landing";
  }, []);

  const [data, setData] = useState(() => {
    if (isPreviewMode) {
      return loadLandingDraft() ?? mergeLandingWithOverrides(landingPageData);
    }

    return mergeLandingWithOverrides(landingPageData);
  });

  useEffect(() => {
    if (!isPreviewMode) return;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== "landing-admin-draft") return;
      setData(loadLandingDraft() ?? mergeLandingWithOverrides(landingPageData));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isPreviewMode]);

  const { hero, sections } = data;

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-extrabold tracking-wide text-lg">BULSU COE</h1>
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="rounded-full border border-gray-400 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              Landing Admin
            </Link>
            <Link
              to="/departments"
              className="rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
            >
              Department Pages
            </Link>
          </div>
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

        <MissionVisionSection data={sections.missionVision} />
        <DepartmentGridSection data={sections.departmentGrid} />
        <NewsSection data={sections.news} />
        <FacilitiesSection data={sections.facilities} />
        <StatisticsSection data={sections.statistics} />
        <ContactSection data={sections.contact} />
      </main>

      <LandingFooterSection data={sections.footer} />
    </div>
  );
}
