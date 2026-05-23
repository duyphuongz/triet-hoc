const CLIENT_ID_KEY = "trietlylagi.anonymousClientId";
const HISTORY_KEY = "trietlylagi.localHistory";

export type LocalHistoryItem = {
  shareSlug: string;
  createdAt: string;
};

function randomId() {
  if ("randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `anon-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getAnonymousClientId() {
  const existing = localStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;
  const next = randomId();
  localStorage.setItem(CLIENT_ID_KEY, next);
  return next;
}

export function saveLocalResult(shareSlug: string) {
  const history = getLocalHistory().filter((item) => item.shareSlug !== shareSlug);
  history.unshift({ shareSlug, createdAt: new Date().toISOString() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

export function getLocalHistory(): LocalHistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as LocalHistoryItem[];
  } catch {
    return [];
  }
}
