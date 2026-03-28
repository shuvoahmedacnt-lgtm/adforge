// src/lib/constants.js

export const PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📸',
    color: '#E1306C',
    formats: [
      { id: 'square', label: 'Square Post', size: '1080×1080' },
      { id: 'story', label: 'Story / Reel', size: '1080×1920' },
      { id: 'landscape', label: 'Landscape', size: '1080×566' },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '👥',
    color: '#1877F2',
    formats: [
      { id: 'square', label: 'Square Post', size: '1080×1080' },
      { id: 'banner', label: 'Link Preview', size: '1200×628' },
      { id: 'story', label: 'Story', size: '1080×1920' },
    ],
  },
  {
    id: 'google',
    name: 'Google Ads',
    icon: '🔍',
    color: '#4285F4',
    formats: [
      { id: 'rectangle', label: 'Medium Rectangle', size: '300×250' },
      { id: 'leaderboard', label: 'Leaderboard', size: '728×90' },
      { id: 'billboard', label: 'Billboard', size: '970×250' },
      { id: 'skyscraper', label: 'Skyscraper', size: '160×600' },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: '#0A66C2',
    formats: [
      { id: 'square', label: 'Sponsored Content', size: '1080×1080' },
      { id: 'landscape', label: 'Standard Sponsored', size: '1200×627' },
      { id: 'banner', label: 'Top Banner', size: '1456×180' },
    ],
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    icon: '🐦',
    color: '#1DA1F2',
    formats: [
      { id: 'landscape', label: 'Twitter Card', size: '1200×675' },
      { id: 'square', label: 'Square Media', size: '1080×1080' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '▶️',
    color: '#FF0000',
    formats: [
      { id: 'thumbnail', label: 'Video Thumbnail', size: '1280×720' },
      { id: 'banner', label: 'Channel Art', size: '2560×1440' },
    ],
  },
];

export const TONES = [
  { id: 'professional', label: 'Professional', emoji: '💼', desc: 'Authoritative & trustworthy' },
  { id: 'bold', label: 'Bold & Direct', emoji: '⚡', desc: 'Punchy, no fluff' },
  { id: 'playful', label: 'Playful', emoji: '🎉', desc: 'Fun, light-hearted' },
  { id: 'luxury', label: 'Luxury', emoji: '✨', desc: 'Premium, sophisticated' },
  { id: 'urgent', label: 'Urgent', emoji: '🔥', desc: 'FOMO-driven, time-sensitive' },
  { id: 'inspirational', label: 'Inspirational', emoji: '🚀', desc: 'Motivating, aspirational' },
  { id: 'empathetic', label: 'Empathetic', emoji: '💛', desc: 'Warm, human-centered' },
  { id: 'technical', label: 'Technical', emoji: '🔬', desc: 'Data-driven, precise' },
];

export const PRESET_PALETTES = [
  { name: 'Ocean', colors: ['#0EA5E9', '#0284C7', '#38BDF8'] },
  { name: 'Sunset', colors: ['#F97316', '#EF4444', '#FBBF24'] },
  { name: 'Forest', colors: ['#22C55E', '#16A34A', '#4ADE80'] },
  { name: 'Royal', colors: ['#7C3AED', '#6D28D9', '#A78BFA'] },
  { name: 'Rose', colors: ['#F43F5E', '#E11D48', '#FDA4AF'] },
  { name: 'Midnight', colors: ['#1E293B', '#334155', '#94A3B8'] },
  { name: 'Gold', colors: ['#D97706', '#B45309', '#FCD34D'] },
  { name: 'Coral', colors: ['#FF6B6B', '#FF8E53', '#FEA3AA'] },
];
