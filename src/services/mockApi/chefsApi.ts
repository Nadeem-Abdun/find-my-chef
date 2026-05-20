import { seedChefs } from '@/data/seed/chefs';
import type { Chef, ChefFilters, Paginated } from '@/types';
import { delay, matchesSearch, paginate } from './helpers';

function filterChefs(chefs: Chef[], filters?: ChefFilters): Chef[] {
  if (!filters) return chefs;
  return chefs.filter((c) => {
    if (filters.categorySlug && c.categorySlug !== filters.categorySlug) return false;
    if (filters.city && c.city !== filters.city) return false;
    if (filters.cuisine && !c.cuisines.includes(filters.cuisine)) return false;
    if (filters.experienceLevel && c.experienceLevel !== filters.experienceLevel) return false;
    if (filters.minRate !== undefined && c.hourlyRate < filters.minRate) return false;
    if (filters.maxRate !== undefined && c.hourlyRate > filters.maxRate) return false;
    if (filters.search) {
      const blob = `${c.name} ${c.headline} ${c.bio} ${c.skills.join(' ')} ${c.cuisines.join(' ')} ${c.city}`;
      if (!matchesSearch(blob, filters.search)) return false;
    }
    return true;
  });
}

export const chefsApi = {
  list: (filters?: ChefFilters, page = 1, pageSize = 9): Promise<Paginated<Chef>> =>
    delay(300, () => paginate(filterChefs(seedChefs, filters), page, pageSize)),

  all: (): Promise<Chef[]> => delay(150, () => [...seedChefs]),

  featured: (): Promise<Chef[]> => delay(200, () => seedChefs.filter((c) => c.featured)),

  getById: (id: string): Promise<Chef | undefined> =>
    delay(200, () => seedChefs.find((c) => c.id === id)),
};
