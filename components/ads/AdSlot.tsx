"use client";

import { useEffect, useRef, useState } from "react";
import { AD_REGISTRY, type AdPlacementConfig } from "@/lib/ads/config";

interface AdSlotProps {
  placement: keyof typeof AD_REGISTRY | string;
  config?: Partial<AdPlacementConfig>;
  className?: string;
  lazy?: boolean;
}

export function AdSlot({ placement, config, className = "", lazy = true }: AdSlotProps) {
  const [isVisible, setIsVisible] = useState(!lazy);
  const [isLoaded, setIsLoaded] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  
  const baseConfig = typeof placement === 'string' && AD_REGISTRY[placement] 
    ? AD_REGISTRY[placement] 
    : (config as AdPlacementConfig);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load slightly before it enters viewport
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsLoaded(true);
      } catch (err) {
        console.error("AdSense Error in Slot:", placement, err);
      }
    }
  }, [isVisible, isLoaded, placement]);

  if (!baseConfig) return null;

  return (
    <div 
      ref={adRef}
      className={`ad-wrapper relative w-full overflow-hidden transition-all duration-500 ${className}`}
      style={{ minHeight: baseConfig.minHeight || 'auto' }}
    >
      {/* Skeleton Placeholder (CLS Prevention) */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 rounded-lg border border-slate-800 animate-pulse">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Advertisement</div>
          <div className="h-4 w-32 bg-slate-800 rounded mb-2"></div>
          <div className="h-3 w-24 bg-slate-800 rounded"></div>
        </div>
      )}

      {/* Actual AdSense Tag */}
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={{ display: "block", ...(!isLoaded ? { visibility: 'hidden' } : {}) }}
          data-ad-client="ca-pub-4721017051634152"
          data-ad-slot={baseConfig.slot}
          data-ad-format={baseConfig.format}
          data-full-width-responsive={baseConfig.responsive ? "true" : "false"}
          data-ad-layout={baseConfig.type === 'in-feed' ? 'in-article' : undefined}
        />
      )}

      {/* Ad Label (Policy Compliance) */}
      <div className="mt-1 text-right">
        <span className="text-[9px] uppercase tracking-tighter text-slate-600">Sponsored Content</span>
      </div>
    </div>
  );
}
