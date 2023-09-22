import axios from 'axios';

const API_URL = 'http://localhost:4500';

// Créer une instance Axios avec des paramètres de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction pour récupérer les en-têtes d'autorisation
const getAuthHeaders = () => {
  const token = localStorage.getItem('jwtToken');
  console.log("Token utilisé:", token);
  return {
    'Authorization': `Bearer ${token}`
  };
};

// Fonction pour gérer les erreurs
const handleApiError = (error) => {
  throw error;
};

// Interception des erreurs 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwtToken');
    }
    return Promise.reject(error);
  }
);

// Fonctions d'API
export const signUp = async (userData) =>
  api.post('/api/signup', userData)
    .then(res => res.data)
    .catch(handleApiError);

export const fetchUserData = async (token) =>
  api.get('/api/users', { headers: getAuthHeaders() })
    .then(res => res.data)
    .catch(handleApiError);

export const login = async (userData) => {
  try {
    const { data } = await api.post('/api/login', userData);
    if (data.token) {
      localStorage.setItem('jwtToken', data.token);
      const userData = await fetchUserData(data.token);
    }
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fonctions liées à l'agenda
export const createAgendaEntry = async (entryData) => {
  if (!entryData.day || !entryData.hour) throw new Error('Day and hour are required');
  return api.post('/api/agenda-entry', entryData, { headers: getAuthHeaders() })
    .then(res => res.data)
    .catch(handleApiError);
};

export const fetchAgendaEntries = async () => api.get('/api/agenda-entry', { headers: getAuthHeaders() })
  .then(res => res.data)
  .catch(handleApiError);


export const updateAgendaEntry = async (entryData) => {
  if (!entryData.day || !entryData.hour || !entryData.id) {
  throw new Error('Day, hour, and ID are required for updating');
    }
  return api.put(`/api/agenda-entry/${entryData.id}`, entryData, { headers: getAuthHeaders() })
    .then(res => res.data)
    .catch(handleApiError);
};
  
export const deleteAgendaEntry = async (id) => api.delete(`/api/agenda-entry/${id}`, { headers: getAuthHeaders() })
  .then(res => res.data)
  .catch(handleApiError);

export const fetchAllInterestsAndNeeds = async () => {
  return api.get('/api/interests', { headers: getAuthHeaders() })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      handleApiError(error);
    });
};

export const saveUserInterests = async (interestData, selectedNeedsWithDuration) => {
  const payload = {
    interests: interestData,
    needsWithDuration: selectedNeedsWithDuration
  };
  
  return api.post('/api/user-interests', payload, { headers: getAuthHeaders() })
  .then(res => {
    return res.data;
  })
  .catch(error => {
    handleApiError(error);
  });
};

export const getUserInterests = async (userId) => {
  return api.get(`/api/user-interests/${userId}`, { headers: getAuthHeaders() })
    .then(res => res.data)
    .catch(handleApiError);
};

export const updateUserInterests = async (userId, interestData, selectedNeedsWithDuration) => {
  const payload = {
    interests: interestData,
    needsWithDuration: selectedNeedsWithDuration
  };
  return api.put(`/api/user-interests/${userId}`, payload, { headers: getAuthHeaders() })
    .then(res => res.data)
    .catch(handleApiError);
};

export const deleteUserInterests = async (userId) => {
  return api.delete(`/api/user-interests/${userId}`, { headers: getAuthHeaders() })
    .then(res => res.data)
    .catch(handleApiError);
};