const BASE_URL = 'http://localhost:3000';

export const apiRequest = async (
    endpoint: string,
    method: string = 'GET',
    body: object | null = null,
    token: string | null = null
) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'An error occurred');
    }

    return response.json();
};
