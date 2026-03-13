import { apiClient } from '@/lib/api/client';

export interface Resource {
  id: number;
  title: string;
  description: string;
  coverUrl?: string;
  externalUrl?: string;
  category: 'HEALTH' | 'EDUCATION' | 'SPIRITUAL' | 'COMMUNITY' | 'OUTREACH' | 'ADMINISTRATION';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateResourceInput {
  title: string;
  description: string;
  coverUrl?: string;
  externalUrl?: string;
  category: 'HEALTH' | 'EDUCATION' | 'SPIRITUAL' | 'COMMUNITY' | 'OUTREACH' | 'ADMINISTRATION';
}

export interface UpdateResourceInput extends Partial<CreateResourceInput> {}

export const resourceService = {
  getAll: (params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    return apiClient<{ resources: Resource[]; total: number }>(
      `/resources${query.toString() ? `?${query.toString()}` : ''}`
    );
  },

  getById: (id: number) => 
    apiClient<{ resource: Resource }>(`/resources/${id}`),

  create: (data: CreateResourceInput) => {
    console.log('📝 Creating resource with data:', data);
    
    // Send all fields as shown in API schema
    const requestData = {
      title: data.title,
      description: data.description,
      coverUrl: data.coverUrl,
      externalUrl: data.externalUrl,
      category: data.category,
    };
    
    console.log('📋 Full request data:', JSON.stringify(requestData, null, 2));
    
    return apiClient<Resource>('/resources', {
      method: 'POST',
      body: JSON.stringify(requestData),
    }).catch(error => {
      console.error('❌ Resource creation failed:', error);
      if (error?.status === 400) {
        console.error('⚠️ Bad Request - Backend validation issue');
        console.error('📋 Data sent:', JSON.stringify(requestData, null, 2));
        console.error('💡 Try checking: field names, data types, or empty values');
        throw new Error('Resource creation failed due to validation errors. Please check all fields and try again.');
      } else if (error?.status === 403) {
        console.error('🚫 Forbidden - User does not have permission to create resources');
        throw new Error('You do not have permission to create resources. Please contact your administrator.');
      }
      throw error;
    });
  },

  update: (id: number, data: UpdateResourceInput) =>
    apiClient<Resource>(`/resources/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiClient<{ success: boolean }>(`/resources/${id}`, {
      method: 'DELETE',
    }),

  search: (query: string) =>
    apiClient<{ resources: Resource[] }>(`/resources/search?q=${query}`),

  uploadCover: (file: File) => {
    console.log('📤 Uploading cover image:', file.name);
    
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient<{ url: string }>('/resources/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    }).catch(error => {
      console.error('❌ Cover upload failed:', error);
      throw error;
    });
  },
};
