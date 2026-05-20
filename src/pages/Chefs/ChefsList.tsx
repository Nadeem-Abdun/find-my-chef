import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { ChefFiltersBar } from '@/components/features/ChefFiltersBar';
import { ChefCard } from '@/components/features/ChefCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchChefs } from '@/store/slices/chefsSlice';
import { setChefFilters } from '@/store/slices/uiSlice';
import { applyChefFilters } from '@/store/selectors';

export default function ChefsListPage() {
  const dispatch = useAppDispatch();
  const { items, loading, loaded } = useAppSelector((s) => s.chefs);
  const filters = useAppSelector((s) => s.ui.chefFilters);
  const [params] = useSearchParams();

  useEffect(() => {
    if (!loaded) dispatch(fetchChefs());
  }, [dispatch, loaded]);

  useEffect(() => {
    const cat = params.get('category') ?? undefined;
    const search = params.get('search') ?? undefined;
    if (cat || search) {
      dispatch(setChefFilters({ ...filters, categorySlug: cat, search }));
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => applyChefFilters(items, filters), [items, filters]);

  return (
    <Container className="py-12 md:py-16">
      <SectionTitle
        eyebrow="Discover talent"
        title="Browse chefs by speciality"
        subtitle="Pre-screened cooks across cuisines, cities and experience levels."
      />

      <div className="mt-8 space-y-6">
        <ChefFiltersBar />

        <p className="text-sm text-muted-foreground">
          {loading && !loaded ? 'Loading…' : `${filtered.length} chef${filtered.length === 1 ? '' : 's'} found`}
        </p>

        {loading && !loaded ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No chefs match those filters"
            description="Try clearing a filter or searching for a different cuisine or city."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <ChefCard key={c.id} chef={c} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
