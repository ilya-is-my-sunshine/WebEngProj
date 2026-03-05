export type LandingHeroData = {
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
};

export type LandingSectionData = {
  id: string;
  title: string;
  assignedGroup: string;
  statusLabel: string;
};

const LANDING_SECTION_IDS = [
  "mission-vision",
  "department-grid",
  "news",
  "facilities",
  "statistics",
  "contact",
  "footer",
] as const;

export async function fetchLandingHeroData(): Promise<LandingHeroData> {
  const response = await fetch("/data/landing/hero.json");

  if (!response.ok) {
    throw new Error("Failed to load landing hero data.");
  }

  return (await response.json()) as LandingHeroData;
}

export async function fetchLandingSections(): Promise<LandingSectionData[]> {
  const sections = await Promise.all(
    LANDING_SECTION_IDS.map(async (id) => {
      const response = await fetch(`/data/landing/${id}.json`);

      if (!response.ok) {
        throw new Error(`Failed to load landing section data for ${id}.`);
      }

      return (await response.json()) as LandingSectionData;
    })
  );

  return sections;
}
