export function delay<T>(ms: number, factory: () => T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(factory()), ms);
  });
}

export function paginate<T>(items: T[], page = 1, pageSize = 9) {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize,
  };
}

export function matchesSearch(haystack: string, needle?: string) {
  if (!needle) return true;
  return haystack.toLowerCase().includes(needle.toLowerCase());
}
