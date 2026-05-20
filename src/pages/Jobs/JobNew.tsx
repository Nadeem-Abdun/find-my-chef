import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch } from '@/store';
import { createJob } from '@/store/slices/jobsSlice';
import { seedCategories } from '@/data/seed/categories';
import { seedCities } from '@/data/seed/cities';
import { seedCuisines } from '@/data/seed/cuisines';
import type { Job } from '@/types';

const RESTAURANT_TYPES: Job['restaurantType'][] = [
  'restaurant',
  'hotel',
  'cloud-kitchen',
  'cafe',
  'food-outlet',
];
const JOB_TYPES: Job['type'][] = ['full-time', 'part-time', 'contract', 'weekends'];

const schema = z
  .object({
    title: z.string().min(5, 'Min 5 characters'),
    restaurant: z.string().min(2, 'Required'),
    restaurantType: z.enum(['restaurant', 'hotel', 'cloud-kitchen', 'cafe', 'food-outlet']),
    description: z.string().min(40, 'Tell candidates a bit more (40+ chars)'),
    categorySlug: z.string().min(1, 'Pick a category'),
    cuisine: z.string().min(1, 'Pick a cuisine'),
    city: z.string().min(1, 'Pick a city'),
    type: z.enum(['full-time', 'part-time', 'contract', 'weekends']),
    experienceMin: z.coerce.number().int().min(0),
    experienceMax: z.coerce.number().int().min(0),
    salaryMin: z.coerce.number().int().min(0),
    salaryMax: z.coerce.number().int().min(0),
  })
  .refine((d) => d.experienceMax >= d.experienceMin, {
    path: ['experienceMax'],
    message: 'Max must be ≥ min',
  })
  .refine((d) => d.salaryMax >= d.salaryMin, {
    path: ['salaryMax'],
    message: 'Max must be ≥ min',
  });

type Values = z.infer<typeof schema>;

export default function JobNewPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      restaurant: '',
      restaurantType: 'restaurant',
      description: '',
      categorySlug: 'head-chef',
      cuisine: 'North Indian',
      city: 'Bengaluru',
      type: 'full-time',
      experienceMin: 2,
      experienceMax: 8,
      salaryMin: 30000,
      salaryMax: 60000,
    },
  });

  const onSubmit = async (v: Values) => {
    const result = await dispatch(
      createJob({
        title: v.title,
        restaurant: v.restaurant,
        restaurantType: v.restaurantType,
        description: v.description,
        categorySlug: v.categorySlug,
        cuisines: [v.cuisine],
        city: v.city,
        type: v.type,
        experienceMin: v.experienceMin,
        experienceMax: v.experienceMax,
        salaryMin: v.salaryMin,
        salaryMax: v.salaryMax,
        status: 'open',
      }),
    );
    if (createJob.fulfilled.match(result)) {
      toast.success('Job posted');
      navigate(`/jobs/${result.payload.id}`);
    } else {
      toast.error('Failed to post job');
    }
  };

  return (
    <Container className="py-12 md:py-16">
      <SectionTitle
        eyebrow="Hiring"
        title="Post a new job"
        subtitle="Fill in the details below. Candidates will see your listing immediately."
      />

      <Card className="mt-8">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Head Chef — Contemporary Indian" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="restaurant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant / company</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="restaurantType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Establishment</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RESTAURANT_TYPES.map((t) => (
                          <SelectItem key={t} value={t} className="capitalize">
                            {t.replace('-', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categorySlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {seedCategories.map((c) => (
                          <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuisine</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {seedCuisines.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {seedCities.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {JOB_TYPES.map((t) => (
                          <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min experience (yrs)</FormLabel>
                    <FormControl><Input type="number" min={0} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienceMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max experience (yrs)</FormLabel>
                    <FormControl><Input type="number" min={0} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary min (₹/mo)</FormLabel>
                    <FormControl><Input type="number" min={0} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salaryMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary max (₹/mo)</FormLabel>
                    <FormControl><Input type="number" min={0} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="Tell candidates about the role…" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 md:col-span-2">
                <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Posting…' : 'Publish job'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}
