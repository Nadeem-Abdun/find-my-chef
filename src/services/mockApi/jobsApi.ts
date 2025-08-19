import { nanoid } from '@reduxjs/toolkit';
import { seedJobs } from '@/data/seed/jobs';
import type { Job, JobFilters, Paginated } from '@/types';
import { delay, matchesSearch, paginate } from './helpers';

export type CreateJobDto = Omit<Job, 'id' | 'postedAt' | 'status'> & { status?: Job['status'] };

function filterJobs(jobs: Job[], filters?: JobFilters): Job[] {
  if (!filters) return jobs;
  return jobs.filter((j) => {
    if (filters.categorySlug && j.categorySlug !== filters.categorySlug) return false;
    if (filters.city && j.city !== filters.city) return false;
    if (filters.type && j.type !== filters.type) return false;
    if (filters.minSalary !== undefined && j.salaryMax < filters.minSalary) return false;
    if (filters.search) {
      const blob = `${j.title} ${j.restaurant} ${j.description} ${j.cuisines.join(' ')} ${j.city}`;
      if (!matchesSearch(blob, filters.search)) return false;
    }
    return true;
  });
}

export const jobsApi = {
  list: (filters?: JobFilters, page = 1, pageSize = 9): Promise<Paginated<Job>> =>
    delay(300, () => paginate(filterJobs(seedJobs, filters), page, pageSize)),

  all: (): Promise<Job[]> => delay(150, () => [...seedJobs]),

  featured: (): Promise<Job[]> => delay(200, () => seedJobs.filter((j) => j.featured)),

  getById: (id: string): Promise<Job | undefined> =>
    delay(200, () => seedJobs.find((j) => j.id === id)),

  create: (dto: CreateJobDto): Promise<Job> =>
    delay(400, () => ({
      ...dto,
      id: `job-${nanoid(8)}`,
      postedAt: new Date().toISOString(),
      status: dto.status ?? 'open',
    })),
};
