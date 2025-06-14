import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Chef } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleChefFavorite } from '@/store/slices/favoritesSlice';
import { initials, formatHourlyRate } from '@/lib/format';
import { cn } from '@/lib/utils';

export function ChefCard({ chef }: { chef: Chef }) {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector((s) => s.favorites.chefIds.includes(chef.id));

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={chef.avatarUrl} alt={chef.name} />
              <AvatarFallback>{initials(chef.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <Link
                to={`/chefs/${chef.id}`}
                className="font-serif text-lg font-semibold leading-tight hover:text-primary"
              >
                {chef.name}
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-1">{chef.headline}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Save chef"
            onClick={() => dispatch(toggleChefFavorite(chef.id))}
          >
            <Heart className={cn('h-4 w-4', isFav && 'fill-primary text-primary')} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {chef.cuisines.slice(0, 3).map((c) => (
            <Badge key={c} variant="muted">{c}</Badge>
          ))}
          {chef.experienceYears > 0 && (
            <Badge variant="outline">{chef.experienceYears}+ yrs</Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{chef.bio}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="font-medium text-foreground">{chef.rating.toFixed(1)}</span>
            <span>({chef.reviewsCount})</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {chef.city}
          </span>
        </div>
        <span className="text-sm font-semibold text-primary">{formatHourlyRate(chef.hourlyRate)}</span>
      </CardFooter>
    </Card>
  );
}
