/**
 * Ad Interleaving Utility
 * Intelligently places ad units within a list of items.
 */

import { AD_REGISTRY, getFeedSlotId } from "./config";

interface InterleaveOptions {
  firstAdIndex: number; // Index of first ad
  frequency: number;    // How many items between ads
  maxAds?: number;      // Maximum ads to show in this list
}

export function interleaveAds<T>(items: T[], options: InterleaveOptions) {
  const result: (T | { isAd: true; slotId: string })[] = [];
  let adCount = 0;

  items.forEach((item, index) => {
    result.push(item);

    // Should we insert an ad after this item?
    const currentItemPos = index + 1;
    const isFirstAdPos = currentItemPos === options.firstAdIndex;
    const isRecurringAdPos = 
      currentItemPos > options.firstAdIndex && 
      (currentItemPos - options.firstAdIndex) % options.frequency === 0;

    if ((isFirstAdPos || isRecurringAdPos) && (!options.maxAds || adCount < options.maxAds)) {
      adCount++;
      result.push({ isAd: true, slotId: getFeedSlotId(adCount) });
    }
  });

  return result;
}
