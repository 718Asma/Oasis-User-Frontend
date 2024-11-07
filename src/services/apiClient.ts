import axios from "axios";

const accessToken = localStorage.getItem("access_token");

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Add a request interceptor to refresh the token if necessary
apiClient.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem("access_token");

        // Check if the token is still valid or needs to be refreshed
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Handle token refresh logic if available
            // You may need to call a refresh endpoint here
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
