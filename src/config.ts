// Configuration file for the application

// Use localhost for development to access local files, otherwise use environment variable
export const API_URL = import.meta.env.DEV ? 'http://localhost:5055' : (import.meta.env.VITE_API_URL || 'http://localhost:5055');
