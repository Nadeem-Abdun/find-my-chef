import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('[ErrorBoundary]', error);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
          <div className="rounded-full bg-destructive/10 p-4 text-destructive">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-2xl font-semibold">Something went off the menu</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            {this.state.error.message || 'Unexpected error. Try reloading the page.'}
          </p>
          <Button onClick={this.reset} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
