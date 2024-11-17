import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to refresh token
const refreshToken = async () => {
  try {
    localStorage.removeItem('access_token');
    const response = await axios.get('http://localhost:3000/auth/refresh-token', {
      withCredentials: true, // to include cookies in the request
    });
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
    return access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

// Add a request interceptor to refresh the token if necessary
apiClient.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle token refresh on 401/403 errors
apiClient.interceptors.response.use(
  response => response, 
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        const newToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest); // Retry the original request
      } catch (err) {
        return Promise.reject(err); // If refresh fails, reject the request
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;