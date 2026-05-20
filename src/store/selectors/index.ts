import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Chef, ChefFilters, Job, JobFilters } from '@/types';

const selectChefs = (s: RootState) => s.chefs.items;
const selectJobsSeed = (s: RootState) => s.jobs.seedItems;
const selectJobsUser = (s: RootState) => s.jobs.userItems;

export const selectAllJobs = createSelector(
  [selectJobsSeed, selectJobsUser],
  (seed, user): Job[] => [...user, ...seed],
);

export const selectFeaturedChefs = createSelector([selectChefs], (chefs) =>
  chefs.filter((c) => c.featured).slice(0, 6),
);

export const selectFeaturedJobs = createSelector([selectAllJobs], (jobs) =>
  jobs.filter((j) => j.featured).slice(0, 6),
);

export const selectChefsByCategory = createSelector(
  [selectChefs, (_: RootState, categorySlug: string) => categorySlug],
  (chefs, slug) => chefs.filter((c) => c.categorySlug === slug),
);

export const selectChefById = (id: string) => (s: RootState) =>
  s.chefs.items.find((c) => c.id === id);

export const selectJobById = (id: string) => (s: RootState) => {
  const all = [...s.jobs.userItems, ...s.jobs.seedItems];
  return all.find((j) => j.id === id);
};

export const selectChefCountByCategory = createSelector([selectChefs], (chefs) => {
  const counts = new Map<string, number>();
  chefs.forEach((c) => counts.set(c.categorySlug, (counts.get(c.categorySlug) ?? 0) + 1));
  return counts;
});

export function applyChefFilters(chefs: Chef[], f: ChefFilters): Chef[] {
  return chefs.filter((c) => {
    if (f.categorySlug && c.categorySlug !== f.categorySlug) return false;
    if (f.city && c.city !== f.city) return false;
    if (f.cuisine && !c.cuisines.includes(f.cuisine)) return false;
    if (f.experienceLevel && c.experienceLevel !== f.experienceLevel) return false;
    if (f.minRate !== undefined && c.hourlyRate < f.minRate) return false;
    if (f.maxRate !== undefined && c.hourlyRate > f.maxRate) return false;
    if (f.search) {
      const blob =
        `${c.name} ${c.headline} ${c.bio} ${c.skills.join(' ')} ${c.cuisines.join(' ')} ${c.city}`.toLowerCase();
      if (!blob.includes(f.search.toLowerCase())) return false;
    }
    return true;
  });
}

export function applyJobFilters(jobs: Job[], f: JobFilters): Job[] {
  return jobs.filter((j) => {
    if (f.categorySlug && j.categorySlug !== f.categorySlug) return false;
    if (f.city && j.city !== f.city) return false;
    if (f.type && j.type !== f.type) return false;
    if (f.minSalary !== undefined && j.salaryMax < f.minSalary) return false;
    if (f.search) {
      const blob =
        `${j.title} ${j.restaurant} ${j.description} ${j.cuisines.join(' ')} ${j.city}`.toLowerCase();
      if (!blob.includes(f.search.toLowerCase())) return false;
    }
    return true;
  });
}

export const selectDashboardStats = createSelector(
  [selectAllJobs, (s: RootState) => s.applications.items, selectChefs],
  (jobs, apps, chefs) => ({
    totalJobs: jobs.length,
    openJobs: jobs.filter((j) => j.status === 'open').length,
    totalApplications: apps.length,
    totalChefs: chefs.length,
  }),
);
