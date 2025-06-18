import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetJobFilters, setJobFilters } from '@/store/slices/uiSlice';
import { seedCategories } from '@/data/seed/categories';
import { seedCities } from '@/data/seed/cities';
import type { JobFilters, JobType } from '@/types';

const ALL = '__all__';
const TYPES: { value: JobType; label: string }[] = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'weekends', label: 'Weekends' },
];

function toUndef(v: string) {
  return v === ALL ? undefined : v;
}

export function JobFiltersBar() {
  const dispatch = useAppDispatch();
  const f = useAppSelector((s) => s.ui.jobFilters);

  const update = (patch: Partial<JobFilters>) => dispatch(setJobFilters({ ...f, ...patch }));
  const hasFilters = Object.values(f).some((v) => v !== undefined && v !== '');

  const FilterFields = (
    <div className="grid gap-3 sm:grid-cols-3">
      <Select
        value={f.categorySlug ?? ALL}
        onValueChange={(v) => update({ categorySlug: toUndef(v) })}
      >
        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All categories</SelectItem>
          {seedCategories.map((c) => (
            <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={f.city ?? ALL} onValueChange={(v) => update({ city: toUndef(v) })}>
        <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All cities</SelectItem>
          {seedCities.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={f.type ?? ALL}
        onValueChange={(v) => update({ type: (toUndef(v) as JobType | undefined) })}
      >
        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All types</SelectItem>
          {TYPES.map((t) => (
            <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, restaurant, or cuisine"
            value={f.search ?? ''}
            onChange={(e) => update({ search: e.target.value || undefined })}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70dvh]">
              <SheetHeader>
                <SheetTitle>Filter jobs</SheetTitle>
              </SheetHeader>
              <div className="mt-6">{FilterFields}</div>
              <Button variant="ghost" className="mt-4 w-full" onClick={() => dispatch(resetJobFilters())}>
                Clear all
              </Button>
            </SheetContent>
          </Sheet>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(resetJobFilters())}
              className="text-muted-foreground"
            >
              <X className="mr-1 h-3.5 w-3.5" /> Clear
            </Button>
          )}
        </div>
      </div>
      <div className="hidden md:block">{FilterFields}</div>
    </div>
  );
}
