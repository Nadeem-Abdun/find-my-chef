import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchChefs } from '@/store/slices/chefsSlice';
import { selectChefById } from '@/store/selectors';
import { initials, formatHourlyRate } from '@/lib/format';

export default function ChefDetailPage() {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const loaded = useAppSelector((s) => s.chefs.loaded);
  const chef = useAppSelector(selectChefById(id));

  useEffect(() => {
    if (!loaded) dispatch(fetchChefs());
  }, [dispatch, loaded]);

  if (loaded && !chef) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Chef not found"
          description="This chef may have been removed or the link is incorrect."
          action={
            <Button asChild>
              <Link to="/chefs">Back to all chefs</Link>
            </Button>
          }
        />
      </Container>
    );
  }

  if (!chef) {
    return (
      <Container className="py-16">
        <p className="text-muted-foreground">Loading…</p>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-16">
      <Button variant="ghost" asChild className="mb-6 -ml-3">
        <Link to="/chefs">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to chefs
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Avatar className="h-28 w-28">
              <AvatarImage src={chef.avatarUrl} alt={chef.name} />
              <AvatarFallback className="text-2xl">{initials(chef.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-3">
              <div>
                <h1 className="font-serif text-3xl font-semibold sm:text-4xl">{chef.name}</h1>
                <p className="text-base text-muted-foreground">{chef.headline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-medium">{chef.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({chef.reviewsCount} reviews)</span>
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {chef.city}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  {chef.experienceYears > 0 ? `${chef.experienceYears} years experience` : 'Fresher'}
                </span>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-semibold">About</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{chef.bio}</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-xl font-semibold">Cuisines</h2>
                <div className="flex flex-wrap gap-2">
                  {chef.cuisines.map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-xl font-semibold">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {chef.skills.map((s) => (
                    <Badge key={s} variant="outline">{s}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Hourly rate
                </p>
                <p className="mt-1 font-serif text-3xl font-semibold text-primary">
                  {formatHourlyRate(chef.hourlyRate)}
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-medium capitalize">{chef.availability}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium capitalize">{chef.experienceLevel}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">City</span>
                  <span className="font-medium">{chef.city}</span>
                </p>
              </div>
              <Button className="w-full">Contact chef</Button>
              <Button variant="outline" className="w-full">
                Save profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
