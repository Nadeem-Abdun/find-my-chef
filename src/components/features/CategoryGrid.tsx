import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { seedCategories } from '@/data/seed/categories';
import { useAppSelector } from '@/store';
import { selectChefCountByCategory } from '@/store/selectors';

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name];
  return Icon ?? Icons.ChefHat;
}

export function CategoryGrid() {
  const counts = useAppSelector(selectChefCountByCategory);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {seedCategories.map((cat) => {
        const Icon = getIcon(cat.icon);
        const count = counts.get(cat.slug) ?? 0;
        return (
          <Link key={cat.id} to={`/chefs?category=${cat.slug}`}>
            <Card className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="flex flex-col items-start gap-3 p-5">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-semibold leading-tight">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{cat.description}</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {count} chef{count === 1 ? '' : 's'}
                </span>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
