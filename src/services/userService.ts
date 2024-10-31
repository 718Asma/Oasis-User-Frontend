import apiClient from './apiClient';

// Get user profile
export const getProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id: string) => {
  try {
    const response = await apiClient.get(`/users/id/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (values: {oldPassword:string, newPassword: string}) => {
  try {
    const response = await apiClient.post('/users/change-password', { values });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Update profile
export const updateProfile = async (profileData: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: string;
    country?: string;
    university?: string;
    courseOfStudy?: string;
    yearOfStudy?: string;
    levelOfStudy?: string;
    fieldOfStudy?: string;
}) => {
  try {
    const response = await apiClient.post('/users/update-profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Update avatar
export const updateAvatar = async (avatar: File) => {
  const formData = new FormData();
  formData.append('profileImage', avatar);

  try {
    const response = await apiClient.post('/users/update-avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};

// Update email
export const updateEmail = async (newEmail: string) => {
  try {
    const response = await apiClient.post('/users/update-email', { newEmail });
    return response.data;
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async () => {
  try {
    const response = await apiClient.post('/users/delete');
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Get list of favorite scholarships
export const getFavorites = async () => {
  try {
    const response = await apiClient.get('/users/favorites');
    return response;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

// Add scholarship to favorites
export const addFavorite = async (scholarshipId: string) => {
  try {
    const response = await apiClient.post('/users/add-favorite', { scholarshipId });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

// Remove scholarship from favorites
export const removeFavorite = async (scholarshipId: string) => {
  try {
    const response = await apiClient.post('/users/remove-favorite', { scholarshipId });
    return response.data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};