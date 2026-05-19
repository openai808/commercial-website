"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type PropertiesListingHighlightContextValue = {
  hoveredListingId: string | null;
  activeListingId: string | null;
  setHoveredListingId: (id: string | null) => void;
  focusListing: (id: string) => void;
  registerListingCardRef: (id: string, element: HTMLElement | null) => void;
  isListingHighlighted: (id: string) => boolean;
};

const PropertiesListingHighlightContext =
  createContext<PropertiesListingHighlightContextValue | null>(null);

type PropertiesListingHighlightProviderProps = {
  listingIds: string[];
  children: ReactNode;
};

export function PropertiesListingHighlightProvider({
  listingIds,
  children,
}: PropertiesListingHighlightProviderProps) {
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const [activeListingId, setActiveListingId] = useState<string | null>(null);
  const cardRefs = useRef(new Map<string, HTMLElement>());
  const listingIdsKey = listingIds.join("|");

  useEffect(() => {
    setHoveredListingId(null);
    setActiveListingId(null);
    cardRefs.current.clear();
  }, [listingIdsKey]);

  const registerListingCardRef = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) cardRefs.current.set(id, element);
      else cardRefs.current.delete(id);
    },
    [],
  );

  const scrollToListingCard = useCallback((id: string) => {
    const el = cardRefs.current.get(id);
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  }, []);

  const focusListing = useCallback(
    (id: string) => {
      setActiveListingId(id);
      scrollToListingCard(id);
    },
    [scrollToListingCard],
  );

  const isListingHighlighted = useCallback(
    (id: string) => id === hoveredListingId || id === activeListingId,
    [hoveredListingId, activeListingId],
  );

  const value = useMemo(
    () => ({
      hoveredListingId,
      activeListingId,
      setHoveredListingId,
      focusListing,
      registerListingCardRef,
      isListingHighlighted,
    }),
    [
      hoveredListingId,
      activeListingId,
      focusListing,
      registerListingCardRef,
      isListingHighlighted,
    ],
  );

  return (
    <PropertiesListingHighlightContext.Provider value={value}>
      {children}
    </PropertiesListingHighlightContext.Provider>
  );
}

export function usePropertiesListingHighlight() {
  return useContext(PropertiesListingHighlightContext);
}
