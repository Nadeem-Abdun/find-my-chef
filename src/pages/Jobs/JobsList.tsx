import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { JobFiltersBar } from '@/components/features/JobFiltersBar';
import { JobCard } from '@/components/features/JobCard';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchJobs } from '@/store/slices/jobsSlice';
import { applyJobFilters, selectAllJobs } from '@/store/selectors';

export default function JobsListPage() {
  const dispatch = useAppDispatch();
  const { loading, loaded } = useAppSelector((s) => s.jobs);
  const filters = useAppSelector((s) => s.ui.jobFilters);
  const all = useAppSelector(selectAllJobs);

  useEffect(() => {
    if (!loaded) dispatch(fetchJobs());
  }, [dispatch, loaded]);

  const filtered = useMemo(() => applyJobFilters(all, filters), [all, filters]);

  return (
    <Container className="py-12 md:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Open positions"
          title="Browse jobs"
          subtitle="Specialism-first listings across India's restaurants, hotels, and cloud kitchens."
        />
        <Button asChild>
          <Link to="/jobs/new">
            <Plus className="mr-2 h-4 w-4" /> Post a job
          </Link>
        </Button>
      </div>

      <div className="mt-8 space-y-6">
        <JobFiltersBar />

        <p className="text-sm text-muted-foreground">
          {loading && !loaded ? 'Loading…' : `${filtered.length} job${filtered.length === 1 ? '' : 's'} found`}
        </p>

        {loading && !loaded ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-56 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No jobs match those filters"
            description="Try clearing a filter or expanding your search."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
