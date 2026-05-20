import type { Category } from '@/types';

export const seedCategories: Category[] = [
  {
    id: 'cat-south-indian',
    name: 'South Indian',
    slug: 'south-indian',
    description: 'Dosa, idly, vada, upma and authentic tiffin specialists.',
    icon: 'Utensils',
  },
  {
    id: 'cat-north-indian',
    name: 'North Indian',
    slug: 'north-indian',
    description: 'Tandoor, curries, biryani and breads.',
    icon: 'Flame',
  },
  {
    id: 'cat-chinese',
    name: 'Chinese & Pan-Asian',
    slug: 'chinese',
    description: 'Indo-Chinese, Thai, Sichuan and fast-food wok masters.',
    icon: 'Soup',
  },
  {
    id: 'cat-continental',
    name: 'Continental',
    slug: 'continental',
    description: 'Italian, French and European fine-dining.',
    icon: 'ChefHat',
  },
  {
    id: 'cat-bakery',
    name: 'Bakery & Patisserie',
    slug: 'bakery',
    description: 'Breads, pastries, cakes and dessert artists.',
    icon: 'Croissant',
  },
  {
    id: 'cat-specialist',
    name: 'Specialist',
    slug: 'specialist',
    description: 'Dosa, biryani, kebab and cuisine-specific masters.',
    icon: 'Award',
  },
  {
    id: 'cat-cloud-kitchen',
    name: 'Cloud Kitchen',
    slug: 'cloud-kitchen',
    description: 'High-volume delivery-first kitchen experts.',
    icon: 'CloudCog',
  },
  {
    id: 'cat-head-chef',
    name: 'Head Chef / Executive',
    slug: 'head-chef',
    description: 'Kitchen leaders, menu designers, operations.',
    icon: 'Crown',
  },
];
