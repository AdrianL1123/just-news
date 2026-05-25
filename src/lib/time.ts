import { formatDistanceToNow } from "date-fns";

export function relativeTime(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}

export function formatUpdatedAt(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}
