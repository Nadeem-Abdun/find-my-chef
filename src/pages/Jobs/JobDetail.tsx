import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Briefcase, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchJobs } from '@/store/slices/jobsSlice';
import { applyToJob } from '@/store/slices/applicationsSlice';
import { selectJobById } from '@/store/selectors';
import { useAuth } from '@/hooks/useAuth';
import { formatSalary, timeAgo } from '@/lib/format';

const applySchema = z.object({
  message: z.string().min(20, 'Tell the kitchen a bit about yourself (20+ chars)').max(800),
});
type ApplyValues = z.infer<typeof applySchema>;

export default function JobDetailPage() {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loaded } = useAppSelector((s) => s.jobs);
  const job = useAppSelector(selectJobById(id));
  const { user, isAuthenticated } = useAuth();
  const myApplications = useAppSelector((s) => s.applications.items);
  const [open, setOpen] = useState(false);

  const form = useForm<ApplyValues>({
    resolver: zodResolver(applySchema),
    defaultValues: { message: '' },
  });

  useEffect(() => {
    if (!loaded) dispatch(fetchJobs());
  }, [dispatch, loaded]);

  const alreadyApplied = myApplications.some((a) => a.jobId === id);

  if (loaded && !job) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Job not found"
          description="This listing may have been closed or removed."
          action={
            <Button asChild>
              <Link to="/jobs">Back to jobs</Link>
            </Button>
          }
        />
      </Container>
    );
  }

  if (!job) {
    return (
      <Container className="py-16">
        <p className="text-muted-foreground">Loading…</p>
      </Container>
    );
  }

  const onApply = async (v: ApplyValues) => {
    if (!isAuthenticated || !user) {
      toast.info('Please sign in to apply', {
        action: { label: 'Sign in', onClick: () => navigate('/login') },
      });
      return;
    }
    await dispatch(applyToJob({ jobId: job.id, chefId: user.id, message: v.message }));
    toast.success('Application submitted');
    setOpen(false);
    form.reset();
  };

  return (
    <Container className="py-12 md:py-16">
      <Button variant="ghost" asChild className="mb-6 -ml-3">
        <Link to="/jobs">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to jobs
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-3xl font-semibold sm:text-4xl">{job.title}</h1>
            <p className="mt-2 text-base text-muted-foreground">
              {job.restaurant} · <span className="capitalize">{job.restaurantType.replace('-', ' ')}</span>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <Badge variant="muted"><MapPin className="mr-1 h-3 w-3" /> {job.city}</Badge>
              <Badge variant="muted"><Briefcase className="mr-1 h-3 w-3" /> {job.type}</Badge>
              <Badge variant="outline">{job.experienceMin}–{job.experienceMax} yrs</Badge>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> Posted {timeAgo(job.postedAt)}
              </span>
            </div>
          </div>

          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-semibold">Role overview</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-xl font-semibold">Cuisines</h2>
                <div className="flex flex-wrap gap-2">
                  {job.cuisines.map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
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
                  Salary
                </p>
                <p className="mt-1 font-serif text-2xl font-semibold text-primary">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </p>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" disabled={alreadyApplied}>
                    {alreadyApplied ? 'Already applied' : 'Apply now'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply to {job.title}</DialogTitle>
                    <DialogDescription>
                      Send a short message to {job.restaurant}. Mention relevant experience.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onApply)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cover note</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={6}
                                placeholder="Hi! I'm a dosa specialist with 8 years at high-volume tiffin centres…"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? 'Sending…' : 'Send application'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="w-full">
                Save job
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
