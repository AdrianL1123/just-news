// import { useEffect } from "react";
import { AlertCircle, Newspaper } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
// import { SummaryCard } from "./SummaryCard";
import { PageSpinner } from "@/components/ui/page-spinner";
import { useNews } from "@/hooks/useNews";
// import { useSummary } from "@/hooks/useSummary";

interface Props {
  country: string;
  category: string;
}

function FeedState({ icon: Icon, message }: { icon: LucideIcon; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-8 py-24 text-foreground/40">
      <Icon className="size-10" strokeWidth={1.5} />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function Feed({ country, category }: Props) {
  const { data: articles = [], isPending, isError } = useNews(country, category);

  // --- AI Summary feature (Ollama / localhost:11434) — disabled ---
  // const summary = useSummary();
  //
  // useEffect(() => {
  //   summary.reset();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [country, category]);
  //
  // const handleGenerate = () => {
  //   summary.mutate({
  //     headlines: articles.map((a) => a.title),
  //     country,
  //     category,
  //   });
  // };
  //
  // const summaryStatus =
  //   summary.status === "pending"
  //     ? "loading"
  //     : summary.status === "success"
  //       ? "done"
  //       : summary.status === "error"
  //         ? "error"
  //         : "idle";
  // ----------------------------------------------------------------

  return (
    <>
      {/* <SummaryCard
        status={summaryStatus}
        text={summary.data ?? null}
        error={summary.error?.message ?? null}
        onGenerate={handleGenerate}
        onReset={summary.reset}
      /> */}

      {isPending && <PageSpinner />}

      {!isPending && isError && (
        <FeedState icon={AlertCircle} message="Could not load news. Try refreshing." />
      )}

      {!isPending && !isError && articles.length === 0 && (
        <FeedState icon={Newspaper} message="No articles found." />
      )}

      {!isPending && !isError && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-8">
          {articles.map((article) => (
            <ArticleCard key={article.uuid} article={article} />
          ))}
        </div>
      )}
    </>
  );
}
