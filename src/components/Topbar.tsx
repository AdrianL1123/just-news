import { RefreshCwIcon } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { newsQueryOptions } from "@/lib/news";
import { formatUpdatedAt } from "@/lib/time";
import { COUNTRIES } from "@/config/nav";

export function Topbar() {
  const { country, category } = useParams({ strict: false });
  const queryClient = useQueryClient();

  const activeCountry = COUNTRIES.find((c) => c.code === country);
  const provider = activeCountry?.provider ?? "thenewsapi";

  const { dataUpdatedAt, isFetching } = useQuery({
    ...newsQueryOptions(country ?? "us", category ?? "general", provider),
    enabled: !!country && !!category,
  });

  function refresh() {
    if (!country || !category) return;
    queryClient.invalidateQueries({
      queryKey: newsQueryOptions(country, category, provider).queryKey,
    });
  }

  const navLabel = (() => {
    if (!country || !category) return "";
    const countryLabel = activeCountry?.label ?? country;
    const categoryLabel =
      activeCountry?.categories.find((cat) => cat.id === category)?.label ?? category;
    return { category: categoryLabel, country: countryLabel };
  })();

  const updatedAt = dataUpdatedAt ? new Date(dataUpdatedAt) : null;

  return (
    <header className="h-12 px-3 border-b border-border flex items-center sticky top-0 bg-background/90 backdrop-blur-md z-50 flex-shrink-0">
      <SidebarTrigger className="mr-2" />

      <div className="mr-auto" />

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
          <RefreshCwIcon className={`size-3 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
    </header>
  );
}
