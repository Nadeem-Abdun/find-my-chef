import { nanoid } from '@reduxjs/toolkit';
import type { Role, User } from '@/types';
import { delay } from './helpers';

export interface LoginDto {
  email: string;
  password: string;
  role?: Role;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role: Role;
  city?: string;
}

const DEMO_USERS: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'owner@demo.com',
    password: 'demo1234',
    user: {
      id: 'user-owner-demo',
      name: 'Rahul Mehra',
      email: 'owner@demo.com',
      role: 'owner',
      avatarUrl: 'https://i.pravatar.cc/100?img=11',
      city: 'Delhi',
      createdAt: '2024-01-01T09:00:00Z',
    },
  },
  {
    email: 'chef@demo.com',
    password: 'demo1234',
    user: {
      id: 'user-chef-demo',
      name: 'Priya Menon',
      email: 'chef@demo.com',
      role: 'chef',
      avatarUrl: 'https://i.pravatar.cc/200?img=47',
      city: 'Mumbai',
      createdAt: '2024-01-01T09:00:00Z',
    },
  },
];

export const authApi = {
  login: (dto: LoginDto): Promise<User> =>
    delay(400, () => {
      const match = DEMO_USERS.find((u) => u.email === dto.email && u.password === dto.password);
      if (!match) throw new Error('Invalid email or password');
      return match.user;
    }),

  register: (dto: RegisterDto): Promise<User> =>
    delay(500, () => ({
      id: `user-${nanoid(8)}`,
      name: dto.name,
      email: dto.email,
      role: dto.role,
      city: dto.city,
      avatarUrl: `https://i.pravatar.cc/200?u=${encodeURIComponent(dto.email)}`,
      createdAt: new Date().toISOString(),
    })),

  demoUsers: DEMO_USERS.map((d) => ({ email: d.email, password: d.password, role: d.user.role })),
};
