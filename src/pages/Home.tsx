import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Banner } from '@/components/features/Banner';
import { CategoryGrid } from '@/components/features/CategoryGrid';
import { PlatformDemo } from '@/components/features/PlatformDemo';
import { Testimonials } from '@/components/features/Testimonials';
import { ChefCard } from '@/components/features/ChefCard';
import { JobCard } from '@/components/features/JobCard';
import { useAppSelector } from '@/store';
import { selectFeaturedChefs, selectFeaturedJobs } from '@/store/selectors';

export default function HomePage() {
  const featuredChefs = useAppSelector(selectFeaturedChefs);
  const featuredJobs = useAppSelector(selectFeaturedJobs);

  return (
    <div>
      <Banner />

      <Container as="section" className="py-16 md:py-24">
        <SectionTitle
          eyebrow="Browse by speciality"
          title="Find chefs the way you'd hire them."
          subtitle="Specialism-first listings — every chef is grouped by what they actually cook best."
        />
        <div className="mt-10">
          <CategoryGrid />
        </div>
      </Container>

      <Container as="section" className="py-16 md:py-24">
        <SectionTitle
          eyebrow="How it works"
          title="From posting to plating, in days."
          subtitle="A clean, focused flow built around hospitality timelines — not generic job-board mechanics."
        />
        <div className="mt-10">
          <PlatformDemo />
        </div>
      </Container>

      <section className="bg-muted/30 py-16 md:py-24">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionTitle eyebrow="Featured chefs" title="Talent worth tasting." />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/chefs">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredChefs.map((c) => (
              <ChefCard key={c.id} chef={c} />
            ))}
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle eyebrow="Open roles" title="Latest jobs across India." />
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link to="/jobs">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </Container>

      <section className="bg-muted/30 py-16 md:py-24">
        <Container>
          <SectionTitle
            eyebrow="Trusted by kitchens & chefs"
            title="What people are saying."
            align="center"
          />
          <div className="mt-10">
            <Testimonials />
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-primary to-primary/80 p-10 text-primary-foreground shadow-xl md:p-16">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-semibold leading-tight md:text-5xl">
                  Ready to find your next chef — or your next kitchen?
                </h2>
                <p className="text-base text-primary-foreground/80">
                  Sign up free. Post a job in 2 minutes. Build your profile in 5.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register">Create an account</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/jobs">Browse jobs</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
