import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient, persister } from "./lib/queryClient";
import { router } from "./router";
import "./index.css";

const rootEl = document.getElementById("root")!;

createRoot(rootEl).render(
  <StrictMode>
    {persister ? (
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
          maxAge: 1000 * 60 * 60 * 24, // 24h
        }}
      >
        <RouterProvider router={router} />
        {import.meta.env.DEV && <ReactQueryDevtools buttonPosition="bottom-left" />}
      </PersistQueryClientProvider>
    ) : (
      <RouterProvider router={router} />
    )}
  </StrictMode>,
);
