// API utility functions for backend integration
// Replace these with actual API calls to your backend

import { 
  Member, 
  SabbathAttendance, 
  CommitteeMeeting, 
  Song, 
  Blog, 
  GalleryItem, 
  Testimony 
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generic fetch wrapper
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Members API
export const membersAPI = {
  getAll: () => fetchAPI<Member[]>('/members'),
  getByFamily: (family: string) => fetchAPI<Member[]>(`/members?family=${family}`),
  create: (member: Partial<Member>) => fetchAPI<Member>('/members', {
    method: 'POST',
    body: JSON.stringify(member),
  }),
  update: (id: string, member: Partial<Member>) => fetchAPI<Member>(`/members/${id}`, {
    method: 'PUT',
    body: JSON.stringify(member),
  }),
  delete: (id: string) => fetchAPI<void>(`/members/${id}`, {
    method: 'DELETE',
  }),
};

// Sabbath Attendance API
export const attendanceAPI = {
  getByDate: (date: string) => fetchAPI<SabbathAttendance[]>(`/attendance?date=${date}`),
  getByFamily: (family: string, date: string) => 
    fetchAPI<SabbathAttendance[]>(`/attendance?family=${family}&date=${date}`),
  create: (attendance: Partial<SabbathAttendance>) => 
    fetchAPI<SabbathAttendance>('/attendance', {
      method: 'POST',
      body: JSON.stringify(attendance),
    }),
  update: (id: string, attendance: Partial<SabbathAttendance>) => 
    fetchAPI<SabbathAttendance>(`/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(attendance),
    }),
};

// Committee Meetings API
export const committeeAPI = {
  getAll: () => fetchAPI<CommitteeMeeting[]>('/committee'),
  getById: (id: string) => fetchAPI<CommitteeMeeting>(`/committee/${id}`),
  create: (meeting: Partial<CommitteeMeeting>) => 
    fetchAPI<CommitteeMeeting>('/committee', {
      method: 'POST',
      body: JSON.stringify(meeting),
    }),
  update: (id: string, meeting: Partial<CommitteeMeeting>) => 
    fetchAPI<CommitteeMeeting>(`/committee/${id}`, {
      method: 'PUT',
      body: JSON.stringify(meeting),
    }),
  delete: (id: string) => fetchAPI<void>(`/committee/${id}`, {
    method: 'DELETE',
  }),
};

// Choir Songs API
export const choirAPI = {
  getAll: () => fetchAPI<Song[]>('/choir'),
  getById: (id: string) => fetchAPI<Song>(`/choir/${id}`),
  create: async (song: Partial<Song>, audioFile?: File) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(song));
    if (audioFile) {
      formData.append('audio', audioFile);
    }

    const response = await fetch(`${API_BASE_URL}/choir`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },
  delete: (id: string) => fetchAPI<void>(`/choir/${id}`, {
    method: 'DELETE',
  }),
};

// Blog API
export const blogAPI = {
  getAll: () => fetchAPI<Blog[]>('/blog'),
  getByCategory: (category: string) => fetchAPI<Blog[]>(`/blog?category=${category}`),
  getById: (id: string) => fetchAPI<Blog>(`/blog/${id}`),
  create: (blog: Partial<Blog>) => fetchAPI<Blog>('/blog', {
    method: 'POST',
    body: JSON.stringify(blog),
  }),
  update: (id: string, blog: Partial<Blog>) => fetchAPI<Blog>(`/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(blog),
  }),
  delete: (id: string) => fetchAPI<void>(`/blog/${id}`, {
    method: 'DELETE',
  }),
};

// Gallery API
export const galleryAPI = {
  getAll: () => fetchAPI<GalleryItem[]>('/gallery'),
  getByType: (type: 'image' | 'video') => fetchAPI<GalleryItem[]>(`/gallery?type=${type}`),
  create: async (item: Partial<GalleryItem>, file: File) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(item));
    formData.append('media', file);

    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },
  delete: (id: string) => fetchAPI<void>(`/gallery/${id}`, {
    method: 'DELETE',
  }),
};

// Testimonies API
export const testimoniesAPI = {
  getAll: () => fetchAPI<Testimony[]>('/testimonies'),
  getApproved: () => fetchAPI<Testimony[]>('/testimonies?approved=true'),
  getPending: () => fetchAPI<Testimony[]>('/testimonies?approved=false'),
  create: (testimony: Partial<Testimony>) => fetchAPI<Testimony>('/testimonies', {
    method: 'POST',
    body: JSON.stringify(testimony),
  }),
  approve: (id: string) => fetchAPI<Testimony>(`/testimonies/${id}/approve`, {
    method: 'POST',
  }),
  delete: (id: string) => fetchAPI<void>(`/testimonies/${id}`, {
    method: 'DELETE',
  }),
};
