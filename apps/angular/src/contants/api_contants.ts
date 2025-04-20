import { environment } from "../environments/environment";

export const API_ENDPOINTS = {
  auth : (appendUrl : string) => `${environment.apiUrl}/auth/${appendUrl}`,
}
