import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { ME } from "../../data/department/ME";
import "../../styles/departments/ME.css";

export default function MEPage() {
  const [baseDept] = useState<typeof ME>(ME);

  const dept = useMemo(
    () => mergeDeptWithOverrides(baseDept),
    [baseDept]
  );

  useEffect(() => {
    if (!dept) return;

    document.title = `${dept.code} | BULSU COE`;

    const link =
      (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
      (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null);

    if (link) {
      link.href = `/icons/${dept.code.toLowerCase()}.svg`;
    }
  }, [dept]);

  const onNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white">
      <Navbar onNav={onNav} />

        <p className="font-bold text-2xl">{dept.title}</p>

      <Footer />
    </div>
  );
}
