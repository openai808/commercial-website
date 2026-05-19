"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useTransition,
  type ReactNode,
} from "react";

function pageFromSearchParams(searchParams: URLSearchParams): number {
  const raw = searchParams.get("page");
  const n = Number(raw ?? "1");
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

type PropertiesListingsNavigationContextValue = {
  /** True while listings URL is updating (search, filters, or pagination). */
  isListingsPending: boolean;
  /** @deprecated Use `isListingsPending`. */
  isPaginationPending: boolean;
  navigateToPage: (page: number) => void;
  navigateListings: (url: string) => void;
};

const PropertiesListingsNavigationContext =
  createContext<PropertiesListingsNavigationContextValue | null>(null);

export function PropertiesListingsNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const navigateListings = useCallback(
    (url: string) => {
      startTransition(() => {
        router.push(url, { scroll: false });
      });
    },
    [router],
  );

  const navigateToPage = useCallback(
    (nextPage: number) => {
      const normalized =
        Number.isFinite(nextPage) && nextPage > 0 ? Math.floor(nextPage) : 1;
      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : "",
      );
      const currentPage = pageFromSearchParams(params);
      if (normalized === currentPage) return;

      const nextParams = new URLSearchParams(params.toString());
      if (normalized <= 1) {
        nextParams.delete("page");
      } else {
        nextParams.set("page", String(normalized));
      }
      const qs = nextParams.toString();
      const url = qs.length > 0 ? `${pathname}?${qs}` : pathname;

      navigateListings(url);
    },
    [navigateListings, pathname],
  );

  const value = useMemo(
    () => ({
      isListingsPending: isPending,
      isPaginationPending: isPending,
      navigateToPage,
      navigateListings,
    }),
    [isPending, navigateListings, navigateToPage],
  );

  return (
    <PropertiesListingsNavigationContext.Provider value={value}>
      {children}
    </PropertiesListingsNavigationContext.Provider>
  );
}

export function usePropertiesListingsNavigation(): PropertiesListingsNavigationContextValue | null {
  return useContext(PropertiesListingsNavigationContext);
}
