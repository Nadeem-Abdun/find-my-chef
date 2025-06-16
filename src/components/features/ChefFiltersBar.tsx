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
import { resetChefFilters, setChefFilters } from '@/store/slices/uiSlice';
import { seedCategories } from '@/data/seed/categories';
import { seedCities } from '@/data/seed/cities';
import { seedCuisines } from '@/data/seed/cuisines';
import type { ChefFilters, ExperienceLevel } from '@/types';

const ALL = '__all__';
const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: 'fresher', label: 'Fresher' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid' },
  { value: 'senior', label: 'Senior' },
  { value: 'head', label: 'Head / Executive' },
];

function toUndef(v: string) {
  return v === ALL ? undefined : v;
}

export function ChefFiltersBar() {
  const dispatch = useAppDispatch();
  const f = useAppSelector((s) => s.ui.chefFilters);

  const update = (patch: Partial<ChefFilters>) => dispatch(setChefFilters({ ...f, ...patch }));
  const hasFilters = Object.values(f).some((v) => v !== undefined && v !== '');

  const FilterFields = (
    <div className="grid gap-3 sm:grid-cols-2">
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

      <Select value={f.cuisine ?? ALL} onValueChange={(v) => update({ cuisine: toUndef(v) })}>
        <SelectTrigger><SelectValue placeholder="Cuisine" /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All cuisines</SelectItem>
          {seedCuisines.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={f.experienceLevel ?? ALL}
        onValueChange={(v) =>
          update({ experienceLevel: (toUndef(v) as ExperienceLevel | undefined) })
        }
      >
        <SelectTrigger><SelectValue placeholder="Experience" /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Any experience</SelectItem>
          {EXPERIENCE_LEVELS.map((e) => (
            <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
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
            placeholder="Search by name, cuisine, skill, or city"
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
            <SheetContent side="bottom" className="h-[80dvh]">
              <SheetHeader>
                <SheetTitle>Filter chefs</SheetTitle>
              </SheetHeader>
              <div className="mt-6">{FilterFields}</div>
              <Button variant="ghost" className="mt-4 w-full" onClick={() => dispatch(resetChefFilters())}>
                Clear all
              </Button>
            </SheetContent>
          </Sheet>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(resetChefFilters())}
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
