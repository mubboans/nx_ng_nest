export interface IUser {
  id?: string;
  username?: string;
  email?: string;
  contact?: string;
  bio?: string;
  profilePicture?: string;
  coverPhoto?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  location?: string;
  website?: string;
  socialLinks?: Record<string, any>; // Optional: define stricter type if structure is known
  role?: 'user' | 'creator' | 'moderator' | 'admin';
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  emailVerifiedAt?: Date;
  phoneVerifiedAt?: Date;
  authToken?: string;
  authTokenExpiry?: Date;
  isActive?: boolean;
  lastLogin?: Date;
  lastLoginIp?: string;
  deviceInfo?: string;
}
