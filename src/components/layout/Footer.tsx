import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { resetDemoData } from '@/store/persist';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/30 safe-bottom">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Logo />
          <p className="max-w-md text-sm text-muted-foreground">
            A dedicated platform connecting aspiring chefs with restaurants, hotels, cloud
            kitchens, cafes and food outlets across India.
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/Nadeem-Abdun" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:hello@findmychef.app">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-base font-semibold">Platform</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground" to="/chefs">Find chefs</Link></li>
            <li><Link className="hover:text-foreground" to="/jobs">Browse jobs</Link></li>
            <li><Link className="hover:text-foreground" to="/jobs/new">Post a job</Link></li>
            <li><Link className="hover:text-foreground" to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-base font-semibold">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground" to="/about">About</Link></li>
            <li><Link className="hover:text-foreground" to="/contact">Contact</Link></li>
            <li>
              <button
                onClick={resetDemoData}
                className="text-left hover:text-foreground"
                type="button"
              >
                Reset demo data
              </button>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Find My Chef. All rights reserved.</p>
      </Container>
    </footer>
  );
}
