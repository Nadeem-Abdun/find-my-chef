export const seedCuisines = [
  'South Indian',
  'North Indian',
  'Indo-Chinese',
  'Chinese',
  'Italian',
  'Mediterranean',
  'Thai',
  'Mughlai',
  'Bengali',
  'Goan',
  'Hyderabadi',
  'Punjabi',
  'Continental',
  'Bakery',
  'Desserts',
  'Street Food',
] as const;

export type Cuisine = (typeof seedCuisines)[number];
