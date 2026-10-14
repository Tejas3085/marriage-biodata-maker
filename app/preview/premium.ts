// Central premium-template config — single place to change prices / premium set.
// NOTE: the server (order API) looks prices up from HERE, never from the client,
// so users can't tamper with the amount in devtools.

export const PREMIUM_PRICE_INR = 49;

// Premium designs, deliberately spread across the whole gallery (early, mid
// and late) so they feel like featured picks — not leftovers at the end.
// Everything else is free forever. To make a template free/premium, just
// add/remove its id here. (Ids must exist in the preview template list.)
export const PREMIUM_TEMPLATE_IDS: number[] = [2, 6, 9, 13, 18, 23, 29, 34];

export function isPremiumTemplate(id: number): boolean {
  return PREMIUM_TEMPLATE_IDS.includes(id);
}

export function getTemplatePrice(id: number): number {
  return isPremiumTemplate(id) ? PREMIUM_PRICE_INR : 0;
}

// ---- Per-device unlock storage (localStorage) ----
// Simple and private: unlocks live only in the buyer's browser.
// For cross-device entitlements you would add user accounts + a database.
const UNLOCK_KEY = "biodata-premium-unlocks:v1";

function readIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(UNLOCK_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

export function readUnlocks(): number[] {
  return readIds();
}

export function hasUnlock(id: number): boolean {
  return readIds().includes(id);
}

export function saveUnlock(id: number): void {
  if (typeof window === "undefined") return;
  try {
    const ids = readIds();
    if (!ids.includes(id)) {
      ids.push(id);
      window.localStorage.setItem(UNLOCK_KEY, JSON.stringify(ids));
    }
  } catch {
    // storage full / private mode — purchase still verified, just not persisted
  }
}
