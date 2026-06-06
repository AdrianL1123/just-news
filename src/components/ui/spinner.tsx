import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className, ...props }: SpinnerProps) {
  return <Loader2Icon className={cn("size-4 animate-spin text-primary", className)} {...props} />;
}
