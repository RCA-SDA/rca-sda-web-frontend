import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { currentUserService, type CurrentUser } from '@/lib/services/currentUser.service';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => currentUserService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updatedData: Partial<CurrentUser>) => {
      // Note: You'll need to implement the update endpoint in the backend
      // For now, we'll just return the updated data
      return updatedData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};
