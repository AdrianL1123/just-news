import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/$country/$category",
      params: { country: "us", category: "general" },
      replace: true,
    });
  },
});
