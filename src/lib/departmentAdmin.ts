import type { DepartmentData } from "../types/department";

export type DepartmentEditableContent = Pick<
  DepartmentData,
  | "programOverview"
  | "peo"
  | "so"
  | "curriculum"
  | "laboratories"
  | "faculty"
  | "careers"
>;

const EDITABLE_KEYS: Array<keyof DepartmentEditableContent> = [
  "programOverview",
  "peo",
  "so",
  "curriculum",
  "laboratories",
  "faculty",
  "careers",
];

function storageKey(code: string) {
  return `department-admin:${code.toUpperCase()}`;
}

function draftStorageKey(code: string) {
  return `department-admin-draft:${code.toUpperCase()}`;
}

export function extractEditableContent(
  dept: DepartmentData
): DepartmentEditableContent {
  return {
    programOverview: dept.programOverview,
    peo: dept.peo,
    so: dept.so,
    curriculum: dept.curriculum,
    laboratories: dept.laboratories,
    faculty: dept.faculty,
    careers: dept.careers,
  };
}

function isEditableContent(value: unknown): value is DepartmentEditableContent {
  if (!value || typeof value !== "object") return false;
  return EDITABLE_KEYS.every((key) => key in (value as Record<string, unknown>));
}

export function loadDeptOverrides(
  code: string
): DepartmentEditableContent | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(storageKey(code));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isEditableContent(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDeptOverrides(code: string, content: DepartmentEditableContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(code), JSON.stringify(content));
}

export function clearDeptOverrides(code: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(storageKey(code));
}

export function loadDeptDraft(code: string): DepartmentEditableContent | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(draftStorageKey(code));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isEditableContent(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDeptDraft(code: string, content: DepartmentEditableContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(draftStorageKey(code), JSON.stringify(content));
}

export function clearDeptDraft(code: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(draftStorageKey(code));
}

export function mergeDeptWithOverrides(dept: DepartmentData): DepartmentData {
  const isPreviewMode =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("preview") === "dept";

  const source = isPreviewMode ? loadDeptDraft(dept.code) : loadDeptOverrides(dept.code);
  if (!source) return dept;

  return {
    ...dept,
    ...source,
  };
}

export function parseEditableContent(json: string): DepartmentEditableContent {
  const parsed = JSON.parse(json) as unknown;

  if (!isEditableContent(parsed)) {
    throw new Error(
      "Invalid JSON structure. Expected keys: programOverview, peo, so, curriculum, laboratories, faculty, careers."
    );
  }

  return parsed;
}
