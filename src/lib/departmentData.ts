import type { DepartmentData } from "../types/department";

export const DEPT_CODES = [
  "CE",
  "CPE",
  "ECE",
  "EE",
  "IE",
  "MFE",
  "ME",
  "MEE",
] as const;

export type DeptCode = (typeof DEPT_CODES)[number];

export const DEPARTMENT_CATALOG: Record<DeptCode, { name: string }> = {
  CE: { name: "Civil Engineering" },
  CPE: { name: "Computer Engineering" },
  ECE: { name: "Electronics Engineering" },
  EE: { name: "Electrical Engineering" },
  IE: { name: "Industrial Engineering" },
  MFE: { name: "Manufacturing Engineering" },
  ME: { name: "Mechanical Engineering" },
  MEE: { name: "Mechatronics Engineering" },
};

export function isDeptCode(value: string): value is DeptCode {
  return DEPT_CODES.includes(value as DeptCode);
}

export async function fetchDepartmentData(code: DeptCode): Promise<DepartmentData> {
  const response = await fetch(`/data/departments/${code}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load department data for ${code}.`);
  }

  return (await response.json()) as DepartmentData;
}
