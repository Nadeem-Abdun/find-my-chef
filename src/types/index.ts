export type Role = 'chef' | 'owner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  city?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export type ExperienceLevel = 'fresher' | 'junior' | 'mid' | 'senior' | 'head';

export interface Chef {
  id: string;
  userId?: string;
  name: string;
  headline: string;
  bio: string;
  avatarUrl?: string;
  categorySlug: string;
  cuisines: string[];
  skills: string[];
  experienceYears: number;
  experienceLevel: ExperienceLevel;
  city: string;
  availability: 'full-time' | 'part-time' | 'weekends' | 'any';
  hourlyRate: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  createdAt: string;
}

export type JobType = 'full-time' | 'part-time' | 'contract' | 'weekends';
export type JobStatus = 'open' | 'closed' | 'draft';

export interface Job {
  id: string;
  ownerId?: string;
  title: string;
  restaurant: string;
  restaurantType: 'restaurant' | 'hotel' | 'cloud-kitchen' | 'cafe' | 'food-outlet';
  description: string;
  categorySlug: string;
  cuisines: string[];
  city: string;
  type: JobType;
  experienceMin: number;
  experienceMax: number;
  salaryMin: number;
  salaryMax: number;
  status: JobStatus;
  postedAt: string;
  featured?: boolean;
}

export type ApplicationStatus = 'applied' | 'shortlisted' | 'interviewing' | 'rejected' | 'hired';

export interface Application {
  id: string;
  jobId: string;
  chefId: string;
  message: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
}

export interface ChefFilters {
  search?: string;
  categorySlug?: string;
  city?: string;
  cuisine?: string;
  experienceLevel?: ExperienceLevel;
  minRate?: number;
  maxRate?: number;
}

export interface JobFilters {
  search?: string;
  categorySlug?: string;
  city?: string;
  type?: JobType;
  minSalary?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
