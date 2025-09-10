import { useAuthStore } from '@/store/authStore';
import { LoginCredentials, RegisterData } from '@/types/auth';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    loadUser
  } = useAuthStore();

  const loginUser = async (credentials: LoginCredentials) => {
    try {
      clearError();
      const success = await login(credentials);
      return success;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const registerUser = async (data: RegisterData) => {
    try {
      clearError();
      const success = await register(data);
      return success;
    } catch (err) {
      console.error('Register error:', err);
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      return false;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    clearError,
    loadUser,
  };
};

export default useAuth;