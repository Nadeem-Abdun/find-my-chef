import { Link } from 'react-router-dom';
import { Award, Heart, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';

const VALUES = [
  {
    icon: Sparkles,
    title: 'Specialism, not generality',
    body: 'Every chef is grouped by what they actually cook best. No generic listings.',
  },
  {
    icon: Heart,
    title: 'Built for hospitality',
    body: 'Designed around the realities of kitchen hiring — shifts, urgency, trust.',
  },
  {
    icon: Users,
    title: 'Direct connections',
    body: 'No middlemen, no recruitment fees. Owners and chefs talk directly.',
  },
  {
    icon: Award,
    title: 'Quality over quantity',
    body: 'A curated talent pool — pre-screened, with verified skill tags.',
  },
];

export default function AboutPage() {
  return (
    <Container className="py-12 md:py-16">
      <SectionTitle
        eyebrow="About"
        title="A platform built for the people who feed us."
        subtitle="Find My Chef is a niche job portal connecting culinary specialists with restaurants, hotels, cloud kitchens, cafes and food outlets across India."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {VALUES.map((v) => (
          <Card key={v.title}>
            <CardContent className="flex gap-4 p-6">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-12">
        <CardContent className="space-y-4 p-8 md:p-12">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">Why we built this</h2>
          <p className="leading-relaxed text-muted-foreground">
            India's hospitality industry runs on chefs — yet most hiring still happens through
            informal networks, paper resumes and word of mouth. Generic job boards are noisy,
            and recruitment agencies charge a premium for the same chef the kitchen could find
            themselves. Find My Chef strips it all back: a clean, focused, specialism-first
            platform that actually understands how kitchens hire.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            This is currently a frontend showcase project — every interaction works against an
            in-browser mock data layer. Future iterations will plug in a real backend, payments,
            and verified reviews.
          </p>
          <div className="pt-2">
            <Button asChild>
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
