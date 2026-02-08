export type UserRole = 'super_admin' | 'operator' | 'auditor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export type BannerPosition = 'homepage_top' | 'homepage_middle' | 'homepage_bottom';
export type BannerChannel = 'android' | 'ios' | 'h5' | 'all';
export type UserType = 'new' | 'old' | 'all';
export type LoginStatus = 'logged_in' | 'not_logged_in' | 'all';
export type BannerStatus = 'draft' | 'pending' | 'online' | 'offline' | 'rejected';

export interface Banner {
  id: string;
  title: string;
  position: BannerPosition;
  imageUrl: string;
  linkUrl: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  channel: BannerChannel;
  cityCodes: string[];
  userType: UserType;
  loginStatus: LoginStatus;
  weight: number;
  status: BannerStatus;
  remark?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface BannerFilter {
  keyword?: string;
  status?: BannerStatus;
  startTime?: string;
  endTime?: string;
}
