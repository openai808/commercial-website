import { fixUtf8Mojibake } from "@/lib/text/fixUtf8Mojibake";
import type { PersonProfile } from "@/lib/people/types";

const AGENT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80";

function asString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) {
    return fixUtf8Mojibake(value.trim());
  }
  return null;
}

function formatLabel(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getPersonName(person: PersonProfile): string | null {
  const name = [person.first_name, person.last_name]
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .map((part) => fixUtf8Mojibake(part.trim()))
    .join(" ")
    .trim();

  return name.length > 0 ? name : null;
}

export function getPersonAvatarUrl(person: PersonProfile): string {
  return asString(person.avatar_url) ?? AGENT_PLACEHOLDER;
}

export function getPersonPosition(person: PersonProfile): string | null {
  return asString(person.position);
}

export function getPersonDepartment(person: PersonProfile): string | null {
  const department = asString(person.department);
  return department ? formatLabel(department) : null;
}

export function getPersonPhone(person: PersonProfile): string | null {
  return asString(person.mobile_number);
}

export function getPersonEmail(person: PersonProfile): string | null {
  return asString(person.email);
}

export function getPersonListingsHref(personId: string): string {
  return `/properties?agent=${encodeURIComponent(personId)}`;
}
