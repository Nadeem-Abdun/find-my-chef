import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/Container';

export default function NotFoundPage() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">404</p>
      <h1 className="font-serif text-4xl font-semibold sm:text-5xl">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for has been moved, deleted or never existed.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/chefs">Browse chefs</Link>
        </Button>
      </div>
    </Container>
  );
}
