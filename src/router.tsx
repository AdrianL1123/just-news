import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./lib/queryClient";
import { PageSpinner } from "@/components/ui/page-spinner";

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: false,
  defaultPendingComponent: PageSpinner,
  defaultPendingMs: 0,
  defaultPendingMinMs: 300,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
