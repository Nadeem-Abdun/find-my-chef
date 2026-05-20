import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/common/Container';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    eyebrow: 'For Restaurants',
    headline: 'Hire a chef who already knows the cuisine.',
    subhead:
      'Pre-screened specialists across South Indian, North Indian, Pan-Asian, Continental and more.',
    cta: { label: 'Browse chefs', to: '/chefs' },
    accent: 'from-primary/15 via-secondary/10 to-transparent',
  },
  {
    eyebrow: 'For Chefs',
    headline: 'Job leads that match your specialism.',
    subhead:
      'No spam, no irrelevant roles. Filter by city, cuisine and shift to find work that fits.',
    cta: { label: 'Browse jobs', to: '/jobs' },
    accent: 'from-secondary/15 via-primary/10 to-transparent',
  },
  {
    eyebrow: 'For Cloud Kitchens',
    headline: 'Volume specialists, ready for service.',
    subhead:
      'Wok masters, biryani chefs and tandoor pros who can hit 200+ orders/hour without losing the recipe.',
    cta: { label: 'Post a job', to: '/jobs/new' },
    accent: 'from-amber-500/15 via-primary/10 to-transparent',
  },
];

export function Banner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const t = setInterval(() => api.scrollNext(), 6000);
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
    return () => clearInterval(t);
  }, [api]);

  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/30 grain">
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        className="relative"
      >
        <CarouselContent>
          {SLIDES.map((s, i) => (
            <CarouselItem key={i}>
              <div
                className={cn(
                  'relative bg-gradient-to-br pb-16 pt-12 sm:pt-16 md:pb-24 md:pt-20',
                  s.accent,
                )}
              >
                <Container className="grid items-center gap-10 md:grid-cols-2">
                  <div className="space-y-6">
                    <p className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {s.eyebrow}
                    </p>
                    <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                      {s.headline}
                    </h1>
                    <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                      {s.subhead}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="lg" asChild>
                        <Link to={s.cta.to}>
                          {s.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="ghost" asChild>
                        <Link to="/about">How it works</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="relative hidden md:block">
                    <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
                    <div className="relative space-y-3 rounded-2xl border bg-card p-6 shadow-lg">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Live now
                      </p>
                      <div className="font-serif text-2xl font-semibold leading-tight">
                        <Typewriter
                          options={{
                            strings: [
                              'Dosa specialist · Bengaluru',
                              'Head chef · Mumbai',
                              'Pastry chef · Kolkata',
                              'Wok master · Pune',
                              'Tandoor expert · Delhi',
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                            deleteSpeed: 30,
                          }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        New roles posted across India every day.
                      </p>
                    </div>
                  </div>
                </Container>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <Container className="relative -mt-8 pb-8 md:-mt-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-full border bg-card p-1.5 shadow-lg"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Try ‘dosa chef Bengaluru’ or ‘pastry Mumbai’"
                className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button asChild className="rounded-full px-6">
              <Link
                to={search ? `/chefs?search=${encodeURIComponent(search)}` : '/chefs'}
              >
                Search
              </Link>
            </Button>
          </form>

          <div className="mt-4 flex justify-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === current ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/40',
                )}
              />
            ))}
          </div>
        </Container>
      </Carousel>
    </section>
  );
}
