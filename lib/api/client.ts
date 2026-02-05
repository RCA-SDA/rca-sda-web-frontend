// API client configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public data?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    console.log('🌐 Making request to:', url);
    console.log('📤 Request options:', options);

    // Get token from localStorage for authenticated requests
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options?.headers,
        },
    };

    console.log('🔧 Final config:', config);

    const response = await fetch(url, config);

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('❌ API Error:', errorData);
        throw new ApiError(
            response.status,
            errorData?.message || response.statusText,
            errorData
        );
    }

    const result = await response.json();
    console.log('✅ Response data:', result);
    return result;
}
