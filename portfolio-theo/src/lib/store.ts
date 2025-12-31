import { create } from 'zustand';

// Quality Tiers for adaptive rendering
export type QualityTier = 'high' | 'medium' | 'low' | 'fallback';

interface QualityState {
  qualityTier: QualityTier;
  isLoading: boolean;
  loadingProgress: number;
  setQualityTier: (tier: QualityTier) => void;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
}

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  activeSection: string;
  setScrollY: (y: number) => void;
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: string) => void;
}

interface UIState {
  isMenuOpen: boolean;
  isContactOpen: boolean;
  toggleMenu: () => void;
  toggleContact: () => void;
  closeAll: () => void;
}

// Quality Store - manages rendering quality based on GPU capabilities
export const useQualityStore = create<QualityState>((set) => ({
  qualityTier: 'high',
  isLoading: true,
  loadingProgress: 0,
  setQualityTier: (tier) => set({ qualityTier: tier }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
}));

// Scroll Store - manages scroll position and section tracking
export const useScrollStore = create<ScrollState>((set) => ({
  scrollY: 0,
  scrollProgress: 0,
  activeSection: 'hero',
  setScrollY: (y) => set({ scrollY: y }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
}));

// UI Store - manages menu and modal states
export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  isContactOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleContact: () => set((state) => ({ isContactOpen: !state.isContactOpen })),
  closeAll: () => set({ isMenuOpen: false, isContactOpen: false }),
}));
