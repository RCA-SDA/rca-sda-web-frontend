import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { meetingNotesService, CreateMeetingNoteInput, MeetingNote } from '@/lib/services/meeting-notes.service';

// Hook to fetch all meeting notes
export const useMeetingNotes = () => {
    return useQuery({
        queryKey: ['meeting-notes'],
        queryFn: () => meetingNotesService.getAll(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to fetch a single meeting note by ID
export const useMeetingNote = (id: number) => {
    return useQuery({
        queryKey: ['meeting-note', id],
        queryFn: () => meetingNotesService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to create a new meeting note
export const useCreateMeetingNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateMeetingNoteInput) => meetingNotesService.create(data),
        onSuccess: () => {
            // Invalidate meeting notes query to refetch
            queryClient.invalidateQueries({ queryKey: ['meeting-notes'] });
            console.log('✅ Meeting note created successfully');
        },
        onError: (error) => {
            console.error('❌ Error creating meeting note:', error);
        },
    });
};

// Hook to update a meeting note
export const useUpdateMeetingNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateMeetingNoteInput> }) =>
            meetingNotesService.update(id, data),
        onSuccess: (_, { id }) => {
            // Invalidate both meeting notes list and specific meeting note
            queryClient.invalidateQueries({ queryKey: ['meeting-notes'] });
            queryClient.invalidateQueries({ queryKey: ['meeting-note', id] });
            console.log('✅ Meeting note updated successfully');
        },
        onError: (error) => {
            console.error('❌ Error updating meeting note:', error);
        },
    });
};

// Hook to delete a meeting note
export const useDeleteMeetingNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => meetingNotesService.delete(id),
        onSuccess: () => {
            // Invalidate meeting notes query to refetch
            queryClient.invalidateQueries({ queryKey: ['meeting-notes'] });
            console.log('✅ Meeting note deleted successfully');
        },
        onError: (error) => {
            console.error('❌ Error deleting meeting note:', error);
        },
    });
};
