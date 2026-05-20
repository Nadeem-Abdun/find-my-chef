import { useAppSelector } from '@/store';

export function useAuth() {
  const { user, isAuthenticated, loading, error } = useAppSelector((s) => s.auth);
  return { user, isAuthenticated, loading, error };
}
