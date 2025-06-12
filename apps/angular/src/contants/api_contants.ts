import { verify } from "crypto";
import { environment } from "../environments/environment";

export const API_ENDPOINTS = {
  auth: (appendUrl : string) => `${environment.apiUrl}/auth/${appendUrl}`,
  otp: (appendUrl : string) => `${environment.apiUrl}/otp/${appendUrl}`,
}

export const API_URL = {
  auth: {
    login: API_ENDPOINTS.auth('login'),
    register: API_ENDPOINTS.auth('register'),
    sendOtp: API_ENDPOINTS.otp('send-code'),
    logout: API_ENDPOINTS.auth('logout'),
    checkuser: API_ENDPOINTS.auth('check-user-exists'),
    forgotPassword: API_ENDPOINTS.auth('forgot-password'),
    userDetails: API_ENDPOINTS.auth('user-details'),
    verifyOtp: API_ENDPOINTS.otp('verify-otp'),
  },
};

export enum OTP_TYPE {
  authentication = 'authentication',
  verification = 'verification',
  passwordReset = 'passwordReset'
}

export const CONSTANT_VARIABLE = {
  SUCCESS_API_RESPONSE: true ,
}
