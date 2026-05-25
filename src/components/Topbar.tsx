import { useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { newsQueryOptions } from "@/lib/news";
import { formatUpdatedAt } from "@/lib/time";
import { COUNTRIES, CATEGORIES } from "@/config/nav";

export function Topbar() {
  const { country, category } = useParams({ strict: false });
  const queryClient = useQueryClient();

  const { dataUpdatedAt, isFetching } = useQuery({
    ...newsQueryOptions(country ?? "us", category ?? "general"),
    enabled: !!country && !!category,
  });

  const refresh = () => {
    if (!country || !category) return;
    queryClient.invalidateQueries({
      queryKey: newsQueryOptions(country, category).queryKey,
    });
  };

  const navLabel = useMemo(() => {
    if (!country || !category) return "";
    const c = COUNTRIES.find((x) => x.code === country)?.label ?? country;
    const cat = CATEGORIES.find((x) => x.id === category)?.label ?? category;
    return { category: cat, country: c };
  }, [country, category]);

  const updatedAt = dataUpdatedAt ? new Date(dataUpdatedAt) : null;

  return (
    <header className="h-12 px-3 border-b border-border flex items-center sticky top-0 bg-background/90 backdrop-blur-md z-50 flex-shrink-0">
      <SidebarTrigger className="mr-2" />

      <span className="font-serif text-[18px] tracking-[-0.2px] mr-auto select-none">
        Just<span className="text-primary">.</span>News
      </span>

      <div className="flex items-center gap-3.5">
        {typeof navLabel === "object" && (
          <span className="text-sm hidden sm:block">
            <span className="font-medium">{navLabel.category}</span>
            {" · "}
            {navLabel.country}
          </span>
        )}

        {updatedAt && (
          <span className="text-xs text-foreground/50 hidden sm:block">
            Updated {formatUpdatedAt(updatedAt)}
          </span>
        )}

        <Button
          onClick={refresh}
          disabled={isFetching || !country || !category}
          variant="outline"
          size="sm"
          className="text-xs gap-1.5"
        >
          <RefreshCw className={`w-3 h-3 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
    </header>
  );
}
