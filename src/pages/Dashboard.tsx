import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ChefHat, Heart, Inbox, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { EmptyState } from '@/components/common/EmptyState';
import { ChefCard } from '@/components/features/ChefCard';
import { JobCard } from '@/components/features/JobCard';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchChefs } from '@/store/slices/chefsSlice';
import { fetchJobs } from '@/store/slices/jobsSlice';
import {
  withdrawApplication,
  updateApplicationStatus,
} from '@/store/slices/applicationsSlice';
import { selectAllJobs, selectDashboardStats } from '@/store/selectors';
import { initials, timeAgo } from '@/lib/format';
import type { ApplicationStatus } from '@/types';

const STATUS_VARIANT: Record<ApplicationStatus, 'default' | 'secondary' | 'destructive' | 'muted'> = {
  applied: 'muted',
  shortlisted: 'secondary',
  interviewing: 'default',
  hired: 'default',
  rejected: 'destructive',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const chefs = useAppSelector((s) => s.chefs.items);
  const allJobs = useAppSelector(selectAllJobs);
  const userJobs = useAppSelector((s) => s.jobs.userItems);
  const applications = useAppSelector((s) => s.applications.items);
  const favorites = useAppSelector((s) => s.favorites);
  const stats = useAppSelector(selectDashboardStats);

  useEffect(() => {
    if (chefs.length === 0) dispatch(fetchChefs());
    if (allJobs.length === 0) dispatch(fetchJobs());
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const isOwner = user.role === 'owner';
  const favoriteChefs = chefs.filter((c) => favorites.chefIds.includes(c.id));
  const favoriteJobs = allJobs.filter((j) => favorites.jobIds.includes(j.id));

  return (
    <Container className="py-12 md:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <SectionTitle eyebrow={`${isOwner ? 'Owner' : 'Chef'} dashboard`} title={`Hi, ${user.name.split(' ')[0]}`} />
          </div>
        </div>
        {isOwner ? (
          <Button asChild>
            <Link to="/jobs/new"><Plus className="mr-2 h-4 w-4" /> Post a job</Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link to="/jobs">Browse open jobs</Link>
          </Button>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Briefcase} label="Open jobs" value={stats.openJobs} />
        <StatCard icon={Inbox} label={isOwner ? 'My listings' : 'My applications'} value={isOwner ? userJobs.length : applications.length} />
        <StatCard icon={ChefHat} label="Chefs available" value={stats.totalChefs} />
        <StatCard icon={Heart} label="Saved items" value={favorites.chefIds.length + favorites.jobIds.length} />
      </div>

      <Tabs defaultValue={isOwner ? 'listings' : 'applications'} className="mt-10">
        <TabsList className="w-full sm:w-auto">
          {isOwner && <TabsTrigger value="listings">My listings</TabsTrigger>}
          {!isOwner && <TabsTrigger value="applications">My applications</TabsTrigger>}
          <TabsTrigger value="favorites">Saved</TabsTrigger>
        </TabsList>

        {isOwner && (
          <TabsContent value="listings" className="space-y-4 pt-6">
            {userJobs.length === 0 ? (
              <EmptyState
                title="No jobs posted yet"
                description="Post your first job to start receiving applications."
                action={
                  <Button asChild>
                    <Link to="/jobs/new"><Plus className="mr-2 h-4 w-4" /> Post a job</Link>
                  </Button>
                }
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {userJobs.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
              </div>
            )}
          </TabsContent>
        )}

        {!isOwner && (
          <TabsContent value="applications" className="pt-6">
            {applications.length === 0 ? (
              <EmptyState
                title="No applications yet"
                description="Apply to a job and your status will appear here."
                action={<Button asChild><Link to="/jobs">Browse jobs</Link></Button>}
              />
            ) : (
              <div className="space-y-3">
                {applications.map((a) => {
                  const job = allJobs.find((j) => j.id === a.jobId);
                  return (
                    <Card key={a.id}>
                      <CardContent className="flex flex-col items-start justify-between gap-3 p-5 sm:flex-row sm:items-center">
                        <div className="space-y-1">
                          <p className="font-serif text-base font-semibold">
                            {job?.title ?? 'Job'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {job?.restaurant} · Applied {timeAgo(a.appliedAt)}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{a.message}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={STATUS_VARIANT[a.status]} className="capitalize">
                            {a.status}
                          </Badge>
                          {a.status === 'applied' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                dispatch(updateApplicationStatus({ id: a.id, status: 'shortlisted' }))
                              }
                            >
                              Mark shortlisted
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => dispatch(withdrawApplication(a.id))}
                          >
                            Withdraw
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        )}

        <TabsContent value="favorites" className="space-y-8 pt-6">
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold">Saved chefs</h3>
            {favoriteChefs.length === 0 ? (
              <EmptyState title="No saved chefs yet" />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteChefs.map((c) => (
                  <ChefCard key={c.id} chef={c} />
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold">Saved jobs</h3>
            {favoriteJobs.length === 0 ? (
              <EmptyState title="No saved jobs yet" />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteJobs.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Briefcase; label: string; value: number }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-serif text-2xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
