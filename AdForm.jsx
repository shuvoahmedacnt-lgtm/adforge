// src/store/useAdStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAdStore = create(
  persist(
    (set, get) => ({
      // ─── Form State ─────────────────────────────────────────────────────
      formData: {
        productName: '',
        productDescription: '',
        brandColors: ['#6366F1', '#8B5CF6', '#F59E0B'],
        adPlatform: 'instagram',
        adFormat: 'square',
        targetAudience: '',
        tone: 'professional',
        additionalNotes: '',
      },

      // ─── Generation State ────────────────────────────────────────────────
      isGenerating: false,
      currentCreative: null,
      error: null,

      // ─── Ads Library ─────────────────────────────────────────────────────
      savedAds: [],

      // ─── Active Tab ───────────────────────────────────────────────────────
      activeTab: 'create', // 'create' | 'library'
      activeVariant: 'main', // 'main' | 'A' | 'B' | 'C'

      // ─── Actions ─────────────────────────────────────────────────────────
      setFormData: (updates) =>
        set((state) => ({
          formData: { ...state.formData, ...updates },
        })),

      setBrandColor: (index, color) =>
        set((state) => {
          const colors = [...state.formData.brandColors];
          colors[index] = color;
          return { formData: { ...state.formData, brandColors: colors } };
        }),

      setActiveTab: (tab) => set({ activeTab: tab }),
      setActiveVariant: (variant) => set({ activeVariant: variant }),

      generateAd: async () => {
        const { formData } = get();
        set({ isGenerating: true, error: null, currentCreative: null });

        try {
          const response = await fetch('/api/generate-ad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });

          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.error || 'Generation failed');
          }

          set({ currentCreative: data.creative, isGenerating: false });
        } catch (err) {
          set({ error: err.message, isGenerating: false });
        }
      },

      saveCurrentAd: () => {
        const { currentCreative, formData, savedAds } = get();
        if (!currentCreative) return;

        const savedAd = {
          id: `ad_${Date.now()}`,
          createdAt: new Date().toISOString(),
          formData: { ...formData },
          creative: { ...currentCreative },
          thumbnail: null,
        };

        set({ savedAds: [savedAd, ...savedAds] });
        return savedAd.id;
      },

      deleteAd: (id) =>
        set((state) => ({
          savedAds: state.savedAds.filter((ad) => ad.id !== id),
        })),

      loadAd: (id) => {
        const { savedAds } = get();
        const ad = savedAds.find((a) => a.id === id);
        if (ad) {
          set({
            currentCreative: ad.creative,
            formData: ad.formData,
            activeTab: 'create',
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'adforge-storage',
      partialize: (state) => ({ savedAds: state.savedAds }),
    }
  )
);
