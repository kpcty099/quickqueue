/**
 * AdSense Registry & Configuration
 * Scalable system for managing up to 100+ ad placements.
 */

export type AdSlotType = 
  | 'display' 
  | 'in-article' 
  | 'in-feed' 
  | 'multiplex' 
  | 'search' 
  | 'link';

export type AdFormat = 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';

export interface AdPlacementConfig {
  id: string;
  slot: string;
  type: AdSlotType;
  format: AdFormat;
  responsive: boolean;
  minHeight?: string; // To prevent CLS
  className?: string;
  priority: number; // 1 = High, 5 = Low
}

export const AD_REGISTRY: Record<string, AdPlacementConfig> = {
  // Homepage Placements
  'HOME_HERO_TOP_01': {
    id: 'HOME_HERO_TOP_01',
    slot: '1234567890',
    type: 'display',
    format: 'horizontal',
    responsive: true,
    minHeight: '90px',
    priority: 1,
  },
  'HOME_INLINE_FEED_01': {
    id: 'HOME_INLINE_FEED_01',
    slot: '5678901234',
    type: 'in-feed',
    format: 'fluid',
    responsive: true,
    minHeight: '250px',
    priority: 2,
  },
  'HOME_INLINE_FEED_02': {
    id: 'HOME_INLINE_FEED_02',
    slot: '5678901235',
    type: 'in-feed',
    format: 'fluid',
    responsive: true,
    minHeight: '250px',
    priority: 3,
  },
  // Scalable In-Feed Pattern (HOME_INLINE_FEED_03 ... HOME_INLINE_FEED_50)
  // These can be dynamically generated or hardcoded for specific slot IDs.
  
  'HOME_SIDEBAR_STICKY_01': {
    id: 'HOME_SIDEBAR_STICKY_01',
    slot: '9876543210',
    type: 'display',
    format: 'vertical',
    responsive: true,
    minHeight: '600px',
    priority: 2,
  },
  
  'FOOTER_GRID_01': {
    id: 'FOOTER_GRID_01',
    slot: '1122334455',
    type: 'multiplex',
    format: 'auto',
    responsive: true,
    minHeight: '280px',
    priority: 4,
  },
};

// Helper to generate dynamic feed slots
export const getFeedSlotId = (index: number) => {
  const slotNum = String(index).padStart(2, '0');
  return `HOME_INLINE_FEED_${slotNum}`;
};
