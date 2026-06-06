import {
  Newspaper,
  Briefcase,
  Cpu,
  Trophy,
  FlaskConical,
  Clapperboard,
  HeartPulse,
} from "lucide-react";

export const COUNTRIES = [
  { code: "us", label: "United States", locale: "us" },
  { code: "my", label: "Malaysia", locale: "my" },
];

export const CATEGORIES = [
  { id: "general", label: "Top Stories", Icon: Newspaper },
  { id: "business", label: "Business", Icon: Briefcase },
  { id: "tech", label: "Technology", Icon: Cpu },
  { id: "sports", label: "Sports", Icon: Trophy },
  { id: "science", label: "Science", Icon: FlaskConical },
  { id: "entertainment", label: "Entertainment", Icon: Clapperboard },
  { id: "health", label: "Health", Icon: HeartPulse },
];
