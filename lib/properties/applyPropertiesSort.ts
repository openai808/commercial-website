import type { PropertiesSort } from "@/lib/properties/sortParams";

type ListingsQuery = {
  order: (
    column: string,
    options?: { ascending?: boolean; nullsFirst?: boolean },
  ) => ListingsQuery;
};

export function applyPropertiesSort<T extends ListingsQuery>(
  query: T,
  sort: PropertiesSort,
): T {
  const ascending = sort.direction === "asc";
  /** Keep empty numeric fields at the end when sorting high-to-low. */
  const nullsFirst = ascending;

  switch (sort.field) {
    case "date":
      return query.order("created_at", { ascending, nullsFirst: false }) as T;
    case "price":
      return query
        .order("selling_price", { ascending, nullsFirst })
        .order("monthly_rental_price", { ascending, nullsFirst }) as T;
    case "size":
      return query
        .order("floor_area", { ascending, nullsFirst })
        .order("lot_area", { ascending, nullsFirst }) as T;
    case "relevance":
    default:
      return query
        .order("featured", { ascending: false, nullsFirst: true })
        .order("created_at", { ascending: false, nullsFirst: false }) as T;
  }
}
