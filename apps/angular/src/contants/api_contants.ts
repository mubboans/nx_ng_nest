import { environment } from "../environments/environment";

export const API_ENDPOINTS = {
  auth : (appendUrl : string) => `${environment.apiUrl}/auth/${appendUrl}`,
}

export const API_URL = {
  auth: {
    login: API_ENDPOINTS.auth('login'),
    register: API_ENDPOINTS.auth('register'),
    refreshToken: API_ENDPOINTS.auth('refresh-token'),
    logout: API_ENDPOINTS.auth('logout'),
    checkuser: API_ENDPOINTS.auth('checkUserExist'),
    forgotPassword: API_ENDPOINTS.auth('forgot-password'),
  },
};
