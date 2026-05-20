import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { seedTestimonials } from '@/data/seed/testimonials';
import { initials } from '@/lib/format';
import { cn } from '@/lib/utils';

export function Testimonials() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {seedTestimonials.map((t) => (
        <Card key={t.id} className="h-full">
          <CardContent className="flex h-full flex-col gap-4 p-6">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn('h-4 w-4', i < t.rating ? 'fill-amber-500' : 'opacity-30')}
                />
              ))}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-foreground">“{t.quote}”</p>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={t.avatarUrl} alt={t.name} />
                <AvatarFallback>{initials(t.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role}
                  {t.company ? ` · ${t.company}` : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
