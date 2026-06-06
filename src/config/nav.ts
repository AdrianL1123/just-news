import {
  Newspaper,
  Briefcase,
  Cpu,
  Trophy,
  FlaskConical,
  Clapperboard,
  HeartPulse,
  LandmarkIcon,
  GlobeIcon,
  PlaneIcon,
  UtensilsCrossedIcon,
  HeartIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Country {
  code: string;
  label: string;
  provider: "thenewsapi" | "newsdataio";
  categories: { id: string; label: string; Icon: LucideIcon }[];
}

export const CATEGORIES_US = [
  { id: "general", label: "Top Stories", Icon: Newspaper },
  { id: "business", label: "Business", Icon: Briefcase },
  { id: "tech", label: "Technology", Icon: Cpu },
  { id: "sports", label: "Sports", Icon: Trophy },
  { id: "science", label: "Science", Icon: FlaskConical },
  { id: "entertainment", label: "Entertainment", Icon: Clapperboard },
  { id: "health", label: "Health", Icon: HeartPulse },
];

export const CATEGORIES_MY = [
  { id: "top", label: "Top Stories", Icon: Newspaper },
  { id: "business", label: "Business", Icon: Briefcase },
  { id: "technology", label: "Technology", Icon: Cpu },
  { id: "sports", label: "Sports", Icon: Trophy },
  { id: "science", label: "Science", Icon: FlaskConical },
  { id: "entertainment", label: "Entertainment", Icon: Clapperboard },
  { id: "health", label: "Health", Icon: HeartPulse },
  { id: "politics", label: "Politics", Icon: LandmarkIcon },
  { id: "world", label: "World", Icon: GlobeIcon },
  { id: "tourism", label: "Tourism", Icon: PlaneIcon },
  { id: "food", label: "Food", Icon: UtensilsCrossedIcon },
  { id: "lifestyle", label: "Lifestyle", Icon: HeartIcon },
];

export const COUNTRIES: Country[] = [
  { code: "us", label: "United States", provider: "thenewsapi", categories: CATEGORIES_US },
  { code: "my", label: "Malaysia", provider: "newsdataio", categories: CATEGORIES_MY },
];

export function isValidCountryCategory(country: string, category: string): boolean {
  return (
    COUNTRIES.find((c) => c.code === country)?.categories.some((cat) => cat.id === category) ??
    false
  );
}
