import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Feed } from "@/components/Feed";
import { newsQueryOptions } from "@/lib/news";
import { writeLastVisited } from "@/lib/lastVisited";

export const Route = createFileRoute("/$country/$category")({
  loader: ({ context: { queryClient }, params: { country, category } }) =>
    queryClient.ensureQueryData(newsQueryOptions(country, category)),
  component: CategoryRoute,
});

function CategoryRoute() {
  const { country, category } = Route.useParams();

  useEffect(() => {
    writeLastVisited({ country, category });
  }, [country, category]);

  return <Feed country={country} category={category} />;
}
