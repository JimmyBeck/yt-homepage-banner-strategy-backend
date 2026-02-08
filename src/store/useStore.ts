import { create } from 'zustand';
import { Banner, User, BannerFilter } from '../types';
import { MOCK_BANNERS, MOCK_USERS } from '../utils/mockData';
import dayjs from 'dayjs';

interface AppState {
  currentUser: User | null;
  banners: Banner[];
  loading: boolean;
  
  // Auth Actions
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  
  // Banner Actions
  fetchBanners: (filter?: BannerFilter) => void;
  addBanner: (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => Promise<void>;
  updateBanner: (id: string, updates: Partial<Banner>) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  batchUpdateStatus: (ids: string[], status: Banner['status']) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  currentUser: null,
  banners: MOCK_BANNERS,
  loading: false,

  login: async (email) => {
    set({ loading: true });
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = MOCK_USERS.find(u => u.email === email) || MOCK_USERS[0]; // Default to admin if not found
    set({ currentUser: user, loading: false });
    return true;
  },

  logout: () => {
    set({ currentUser: null });
  },

  fetchBanners: (filter) => {
    set({ loading: true });
    // In a real app, this would be an API call. 
    // Here we just filter the in-memory MOCK_BANNERS if we were resetting, 
    // but since we maintain state in 'banners', we might want to reload from initial if needed?
    // For this demo, we'll assume 'banners' holds the current source of truth.
    // So 'fetch' is a bit of a misnomer for client-side only, but let's simulate filtering.
    
    // Actually, to support "Search", we should probably keep a master list and a display list,
    // or just let the UI filter. For simplicity, let's just pretend we fetched fresh data.
    setTimeout(() => {
      set({ loading: false });
    }, 300);
  },

  addBanner: async (bannerData) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newBanner: Banner = {
      ...bannerData,
      id: `b${Date.now()}`,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      createdBy: get().currentUser?.id || 'unknown',
    };
    
    set(state => ({
      banners: [newBanner, ...state.banners],
      loading: false
    }));
  },

  updateBanner: async (id, updates) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set(state => ({
      banners: state.banners.map(b => 
        b.id === id ? { ...b, ...updates, updatedAt: dayjs().toISOString() } : b
      ),
      loading: false
    }));
  },

  deleteBanner: async (id) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set(state => ({
      banners: state.banners.filter(b => b.id !== id),
      loading: false
    }));
  },
  
  batchUpdateStatus: async (ids, status) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set(state => ({
      banners: state.banners.map(b => 
        ids.includes(b.id) ? { ...b, status, updatedAt: dayjs().toISOString() } : b
      ),
      loading: false
    }));
  }
}));
