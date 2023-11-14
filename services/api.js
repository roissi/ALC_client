import axios from "axios";

const API_URL = "https://artificial-life-coach-c51d3462ed92.herokuapp.com/";
// const API_URL = 'http://localhost:4500';

// Créer une instance Axios avec des paramètres de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour récupérer les en-têtes d'autorisation
const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    console.log("Token utilisé:", token);
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

// Fonction pour gérer les erreurs
const handleApiError = (error) => {
  console.log("API Error: ", error);
  throw error;
};

// Interception des erreurs 401
api.interceptors.response.use(
  (response) => {
    console.log("Intercepted response: ", response);
    return response;
  },
  (error) => {
    console.log("Intercepted error: ", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("jwtToken");
    }
    return Promise.reject(error);
  },
);

// Fonctions d'API
export const signUp = async (userData) =>
  api
    .post("/api/signup", userData)
    .then((res) => res.data)
    .catch(handleApiError);

export const fetchUserData = async (token) =>
  api
    .get("/api/users", { headers: getAuthHeaders() })
    .then((res) => res.data)
    .catch(handleApiError);

export const login = async (userData) => {
  try {
    const { data } = await api.post("/api/login", userData);
    if (data.token) {
      localStorage.setItem("jwtToken", data.token);
      const userData = await fetchUserData(data.token);
    }
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fonctions liées à l'agenda
export const addOrUpdateAgendaEntry = async (entryData) => {
  console.log("addOrUpdate : Sending the following entryData: ", entryData);
  if (!entryData.day || entryData.hour === undefined) {
    throw new Error("Day and hour are required");
  }

  if (entryData.id) {
    return updateAgendaEntry(entryData);
  } else {
    return createAgendaEntry(entryData);
  }
};

export const createAgendaEntry = async (entryData) => {
  console.log("create : Sending the following entryData: ", entryData);
  return api
    .post("/api/agenda-entry", entryData, { headers: getAuthHeaders() })
    .then((res) => {
      console.log("Success: ", res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("Error data: ", error.response.data);
      handleApiError(error);
    });
};

export const fetchAgendaEntries = async () => {
  return api
    .get("/api/agenda-entry", { headers: getAuthHeaders() })
    .then((res) => res.data)
    .catch(handleApiError);
};

export const updateAgendaEntry = async (entryData) => {
  if (!entryData.id) {
    throw new Error("ID is required for updating");
  }
  return api
    .put(`/api/agenda-entry/${entryData.id}`, entryData, {
      headers: getAuthHeaders(),
    })
    .then((res) => res.data)
    .catch(handleApiError);
};

export const deleteAgendaEntry = async (id) => {
  return api
    .delete(`/api/agenda-entry/${id}`, { headers: getAuthHeaders() })
    .then((res) => res.data)
    .catch(handleApiError);
};

export const fetchAllInterestsAndNeeds = async () => {
  console.log("Fetching all interests and needs...");
  return api
    .get("/api/interests", { headers: getAuthHeaders() })
    .then((res) => {
      console.log("Data received: ", res.data);
      return res.data;
    })
    .catch((error) => {
      handleApiError(error);
    });
};

export const saveUserInterests = async (
  interestData,
  selectedNeedsWithDuration,
) => {
  const payload = {
    interests: interestData,
    needsWithDuration: selectedNeedsWithDuration,
  };

  return api
    .post("/api/user-interests", payload, { headers: getAuthHeaders() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleApiError(error);
    });
};

export const getUserInterests = async (userId) => {
  return api
    .get(`/api/user-interests/${userId}`, { headers: getAuthHeaders() })
    .then((res) => res.data)
    .catch(handleApiError);
};

export const updateUserInterests = async (
  userId,
  interestData,
  selectedNeedsWithDuration,
) => {
  const payload = {
    interests: interestData,
    needsWithDuration: selectedNeedsWithDuration,
  };
  return api
    .put(`/api/user-interests/${userId}`, payload, {
      headers: getAuthHeaders(),
    })
    .then((res) => res.data)
    .catch(handleApiError);
};

export const deleteUserInterests = async (userId) => {
  return api
    .delete(`/api/user-interests/${userId}`, { headers: getAuthHeaders() })
    .then((res) => res.data)
    .catch(handleApiError);
};

// Fonction pour obtenir une suggestion du coach
export const getSuggestionFromCoach = async (query) => {
  return api
    .post(
      "/api/suggestion/openai",
      { prompt: query },
      { headers: getAuthHeaders() },
    )
    .then((res) => res.data)
    .catch(handleApiError);
};

// Fonction pour ajouter une entrée suggestion à l'agenda
export const addToAgenda = async (agendaData) => {
  try {
    return await api
      .post("/api/agenda-entry/add-suggestion", agendaData, {
        headers: getAuthHeaders(),
      })
      .then((res) => res.data);
  } catch (error) {
    handleApiError(error);
  }
};

// Fonction pour obtenir toutes les suggestions du coach pour un utilisateur
export const getAllSuggestionsFromCoach = async (userId) => {
  return api
    .get(`/api/suggestion/?userId=${userId}`, { headers: getAuthHeaders() })
    .then((res) => res.data)
    .catch(handleApiError);
};

// Fonction pour marquer une suggestion comme ajoutée à l'agenda
export const markSuggestionAsAddedToAgenda = async (suggestionId) => {
  try {
    return await api
      .put(
        `/api/suggestion/markAsAdded/${suggestionId}`,
        {},
        { headers: getAuthHeaders() },
      )
      .then((res) => res.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const markSuggestionAsRemovedFromAgenda = async (suggestionId) => {
  try {
    return await api
      .put(
        `/api/suggestion/markAsRemoved/${suggestionId}`,
        {},
        { headers: getAuthHeaders() },
      )
      .then((res) => res.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteSuggestion = async (suggestionId) => {
  try {
    return await api
      .delete(`/api/suggestion/${suggestionId}`, { headers: getAuthHeaders() })
      .then((res) => res.data);
  } catch (error) {
    handleApiError(error);
  }
};
