import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export function useAuth(requireAuth = true) {
  const { user, isAuthenticated, isLoading, loadUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Load user on mount if we have a token
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token && !user) {
        loadUser();
      }
    }
  }, [user, loadUser]);

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push('/login');
      } else if (!requireAuth && isAuthenticated) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
}

export function useRequireAuth() {
  return useAuth(true);
}

export function useRedirectIfAuth() {
  return useAuth(false);
}