const BASE_URL = 'http://localhost:5000/api';

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Registration failed');
  }
  
  return response.json();
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }
  
  return response.json();
};

export const searchMovies = async (query: string) => {
  const response = await fetch(`${BASE_URL}/movies/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to fetch search results');
  return response.json();
}

export async function getPopularMovies() {
  const response = await fetch(`${BASE_URL}/movies/popular`);
  if (!response.ok) throw new Error('Failed to fetch popular movies');
  return response.json();
}