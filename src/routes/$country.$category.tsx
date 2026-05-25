import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Newspaper } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { PageSpinner } from "@/components/ui/page-spinner";
import { newsQueryOptions } from "@/lib/news";

export const Route = createFileRoute("/$country/$category")({
  loader: ({ context: { queryClient }, params: { country, category } }) =>
    queryClient.ensureQueryData(newsQueryOptions(country, category)),
  component: CategoryRoute,
});

function CategoryRoute() {
  const { country, category } = Route.useParams();
  const { data: articles = [], isPending, isError } = useQuery(newsQueryOptions(country, category));

  if (isPending) {
    return <PageSpinner />;
  }

  if (isError) {
    return <FeedState icon={AlertCircle} message="Could not load news. Try refreshing." />;
  }

  if (articles.length === 0) {
    return <FeedState icon={Newspaper} message="No articles found." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-8">
      {articles.map((article) => (
        <ArticleCard key={article.uuid} article={article} />
      ))}
    </div>
  );
}

function FeedState({ icon: Icon, message }: { icon: LucideIcon; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-8 py-24 text-foreground/40">
      <Icon className="size-10" strokeWidth={1.5} />
      <p className="text-sm">{message}</p>
    </div>
  );
}
