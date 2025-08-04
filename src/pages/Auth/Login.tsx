import { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAppDispatch } from '@/store';
import { loginThunk } from '@/store/slices/authSlice';
import { useAuth } from '@/hooks/useAuth';
import { authApi } from '@/services/mockApi';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Min 6 characters'),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, error, loading } = useAuth();

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (isAuthenticated) {
    const from = (location.state as { from?: Location } | null)?.from?.pathname ?? '/dashboard';
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (v: Values) => {
    const r = await dispatch(loginThunk(v));
    if (loginThunk.fulfilled.match(r)) {
      toast.success(`Welcome back, ${r.payload.name.split(' ')[0]}`);
      navigate('/dashboard');
    }
  };

  const fillDemo = (email: string, password: string) => {
    form.setValue('email', email);
    form.setValue('password', password);
  };

  return (
    <Container className="grid min-h-[80vh] place-items-center py-12">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6 p-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <Logo />
            <h1 className="font-serif text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to manage your applications and listings.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" autoComplete="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" autoComplete="current-password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </Form>

          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Demo accounts
            </p>
            <div className="grid gap-2">
              {authApi.demoUsers.map((d) => (
                <Button
                  key={d.email}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="justify-between"
                  onClick={() => fillDemo(d.email, d.password)}
                >
                  <span className="font-mono text-xs">{d.email}</span>
                  <span className="text-xs capitalize text-muted-foreground">{d.role}</span>
                </Button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            New here?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </Container>
  );
}
