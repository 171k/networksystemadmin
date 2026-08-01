export type Concept = {
  id: string;
  title: string;
  simple: string;
  formal: string;
  terms: string[];
  example: string;
  diagramId: string;
  sourcePage: string;
};
export type Module = {
  id: string;
  chapter: number;
  title: string;
  eyebrow: string;
  objectives: string[];
  concepts: Concept[];
  minutes: number;
};
export type Chapter = {
  id: string;
  number: number;
  title: string;
  short: string;
  color: string;
  modules: Module[];
};
export type Progress = {
  version: 1;
  viewed: string[];
  completed: string[];
  understood: string[];
  memorized: string[];
  weak: string[];
  bookmarks: string[];
  mistakes: { id: string; prompt: string; answer: string }[];
  notes: Record<string, string>;
  attempts: Record<string, { correct: number; total: number }>;
  reviews: Record<string, { ease: number; next: string; interval: number }>;
  theme: "light" | "dark";
};
