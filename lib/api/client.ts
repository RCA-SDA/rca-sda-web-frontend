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
        let errorData = { message: response.statusText };
        try {
            const jsonData = await response.json();
            if (jsonData && typeof jsonData === 'object') {
                errorData = jsonData;
            }
        } catch (jsonError) {
            console.warn('⚠️ Could not parse error response as JSON:', jsonError);
        }
        console.error('❌ API Error:', JSON.stringify(errorData));
        throw new ApiError(
            response.status,
            errorData?.message || response.statusText,
            errorData
        );
    }

    let result = null;
    try {
        // Check if response has content before trying to parse JSON
        const text = await response.text();
        console.log('📥 Raw response text:', text);

        if (!text || text.trim() === '') {
            console.log('✅ Empty response received, returning null');
            return null as T;
        }

        result = JSON.parse(text);
    } catch (jsonError) {
        console.warn('⚠️ Could not parse response as JSON:', jsonError);
        throw new Error('Invalid JSON response from server');
    }
    console.log('✅ Response data:', result);
    return result;
}
