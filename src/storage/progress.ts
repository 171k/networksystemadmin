import type { Progress } from "../types";
export const blankProgress: Progress = {
  version: 1,
  viewed: [],
  completed: [],
  understood: [],
  memorized: [],
  weak: [],
  bookmarks: [],
  mistakes: [],
  notes: {},
  attempts: {},
  reviews: {},
  theme: "light",
};
const KEY = "itt420-mastery:v1";
export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...blankProgress, ...JSON.parse(raw) } : blankProgress;
  } catch {
    return blankProgress;
  }
}
export function saveProgress(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p));
}
export function exportProgress(p: Progress) {
  const blob = new Blob(
    [JSON.stringify({ ...p, exportedAt: new Date().toISOString() }, null, 2)],
    { type: "application/json" },
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "itt420-mastery-progress.json";
  a.click();
  URL.revokeObjectURL(a.href);
}
export async function importProgress(file: File) {
  const data = JSON.parse(await file.text());
  if (data.version !== 1) throw new Error("Unsupported progress version");
  return { ...blankProgress, ...data } as Progress;
}
