import { Link } from 'react-router-dom';
import { Briefcase, Clock, Heart, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Job } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleJobFavorite } from '@/store/slices/favoritesSlice';
import { formatSalary, timeAgo } from '@/lib/format';
import { cn } from '@/lib/utils';

const TYPE_LABEL: Record<Job['type'], string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  weekends: 'Weekends',
};

const RESTAURANT_TYPE_LABEL: Record<Job['restaurantType'], string> = {
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  'cloud-kitchen': 'Cloud Kitchen',
  cafe: 'Cafe',
  'food-outlet': 'Food Outlet',
};

export function JobCard({ job }: { job: Job }) {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector((s) => s.favorites.jobIds.includes(job.id));

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/jobs/${job.id}`}
              className="font-serif text-lg font-semibold leading-tight hover:text-primary"
            >
              {job.title}
            </Link>
            <p className="text-sm text-muted-foreground">
              {job.restaurant} · {RESTAURANT_TYPE_LABEL[job.restaurantType]}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Save job"
            onClick={() => dispatch(toggleJobFavorite(job.id))}
          >
            <Heart className={cn('h-4 w-4', isFav && 'fill-primary text-primary')} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="muted">
            <MapPin className="mr-1 h-3 w-3" /> {job.city}
          </Badge>
          <Badge variant="muted">
            <Briefcase className="mr-1 h-3 w-3" /> {TYPE_LABEL[job.type]}
          </Badge>
          <Badge variant="outline">
            {job.experienceMin}–{job.experienceMax} yrs
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t bg-muted/30 px-5 py-3">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> {timeAgo(job.postedAt)}
        </span>
        <span className="text-sm font-semibold text-primary">
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
      </CardFooter>
    </Card>
  );
}
