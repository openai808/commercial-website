/** Matches the default category scope used by the /insights listing. */
export function isInsightsCategory(
  category: string | null | undefined,
): boolean {
  return typeof category === "string" && category.toLowerCase().includes("insights");
}
