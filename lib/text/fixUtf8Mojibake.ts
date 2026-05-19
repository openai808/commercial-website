/** UTF-8 misread as Latin-1, e.g. "BiÃ±an" instead of "Biñan". */
const MOJIBAKE_PATTERN = /Ã[\u0080-\u00BF]|Â[\u0080-\u00BF]/;

/**
 * Repairs strings where UTF-8 bytes were stored or transmitted as Latin-1 characters.
 */
export function fixUtf8Mojibake(value: string): string {
  if (!MOJIBAKE_PATTERN.test(value)) return value;

  try {
    const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff);
    const fixed = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    if (fixed && !fixed.includes("\uFFFD")) return fixed;
  } catch {
    // Not recoverable; return the original string.
  }

  return value;
}

/**
 * Re-encodes UTF-8 text the way broken Latin-1 storage would represent it
 * (e.g. "Biñan" → "BiÃ±an"). Use when querying columns that still hold mojibake.
 */
export function toUtf8Mojibake(value: string): string {
  const bytes = new TextEncoder().encode(value);
  return String.fromCharCode(...bytes);
}

/** Values to use in DB filters so both correct UTF-8 and mojibake rows match. */
export function expandDbTextVariants(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) return [];

  const mojibake = toUtf8Mojibake(trimmed);
  return mojibake === trimmed ? [trimmed] : [trimmed, mojibake];
}

export function expandDbTextVariantsList(values: string[]): string[] {
  return [...new Set(values.flatMap((value) => expandDbTextVariants(value)))];
}
