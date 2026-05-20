import type { Testimonial } from '@/types';

export const seedTestimonials: Testimonial[] = [
  {
    id: 'test-001',
    name: 'Kavita Shenoy',
    role: 'Owner',
    company: 'Kamat Tiffins, Chennai',
    avatarUrl: 'https://i.pravatar.cc/100?img=5',
    quote:
      'Found our morning dosa chef in 48 hours. The calibre of applicants was genuinely surprising — all pre-screened.',
    rating: 5,
  },
  {
    id: 'test-002',
    name: 'Rahul Mehra',
    role: 'F&B Manager',
    company: 'The Grand Meridian',
    avatarUrl: 'https://i.pravatar.cc/100?img=11',
    quote:
      'Hired two tandoor chefs and a sous chef through the platform. The filter-by-city and experience-level saved us weeks.',
    rating: 5,
  },
  {
    id: 'test-003',
    name: 'Ishita Banerjee',
    role: 'Pastry Chef',
    company: 'Independent',
    avatarUrl: 'https://i.pravatar.cc/100?img=32',
    quote:
      'Job leads that actually match my specialism. Got three relevant interviews in my first week.',
    rating: 5,
  },
  {
    id: 'test-004',
    name: 'Deepak Sharma',
    role: 'Operations Chef',
    company: 'Cloud Kitchen Co.',
    avatarUrl: 'https://i.pravatar.cc/100?img=68',
    quote:
      'Clean UI, real people. No spam, no irrelevant roles. This is how hospitality hiring should work.',
    rating: 4,
  },
];
