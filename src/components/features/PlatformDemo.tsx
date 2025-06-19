import { ChefHat, ClipboardList, Handshake, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Post your need',
    body: 'Restaurants describe the role. Chefs build a focused profile around their specialism.',
    role: 'For owners',
  },
  {
    icon: Search,
    title: 'Match by specialism',
    body: 'Filter by cuisine, city, experience and shift. No generic listings — every result is relevant.',
    role: 'For both',
  },
  {
    icon: Handshake,
    title: 'Connect & shortlist',
    body: 'Direct conversations. No middlemen. Save profiles, manage applications, hire faster.',
    role: 'For both',
  },
  {
    icon: ChefHat,
    title: 'Start cooking',
    body: 'From application to first shift in days, not weeks. Built for hospitality timelines.',
    role: 'For chefs',
  },
];

export function PlatformDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((s, i) => (
        <Card key={s.title} className="relative overflow-hidden">
          <CardContent className="space-y-3 p-6">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="font-serif text-3xl font-semibold text-muted-foreground/30">
                0{i + 1}
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
              {s.role}
            </p>
            <h3 className="font-serif text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
