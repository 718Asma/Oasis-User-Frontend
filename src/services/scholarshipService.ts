import apiClient from './apiClient';

// Get a list of all scholarships
export const getScholarships = async () => {
  try {
    const response = await apiClient.get('/scholarships');
    return response.data;
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    throw error;
  }
};

// Get a distinct list of scholarship locations
export const getScholarshipLocations = async () => {
  try {
    const response = await apiClient.get('/scholarships/locations');
    return response.data;
  } catch (error) {
    console.error('Error fetching scholarship locations:', error);
    throw error;
  }
};

// Get scholarships by a specific location
export const getScholarshipsByLocation = async (location: string) => {
  try {
    const response = await apiClient.get(`/scholarships/location/${location}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scholarships by location:', error);
    throw error;
  }
};

// Search scholarships by name
export const searchScholarshipsByName = async (name: string) => {
  try {
    const response = await apiClient.get('/scholarships/search', {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching scholarships by name:', error);
    throw error;
  }
};

// Get details of a specific scholarship by ID
export const getScholarshipById = async (id: string) => {
  try {
    const response = await apiClient.get(`/scholarships/id/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scholarship by ID:', error);
    throw error;
  }
};

// Get scholarships by deadline
// export const getScholarshipsByDeadline = async (deadline: string) => {
//   try {
//     const response = await apiClient.get(`/scholarships/deadline/${deadline}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching scholarships by deadline:', error);
//     throw error;
//   }
// };