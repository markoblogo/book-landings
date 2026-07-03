'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createSitelenLayerPluginOptions, createSitelenLayerProfiles } from '@book-landings/landing-sitelen';

const sitelenDebugEnabled = process.env.NODE_ENV === 'development';
const sitelenBaseConfig = {
  onProfileMatch: (profileId: string | null | undefined) => {
    console.info('[toki-free-kit] sitelen profile:', profileId ?? 'none');
  }
};

const sitelenProfiles = createSitelenLayerProfiles({
  storageKey: 'toki-free-kit:sitelen-layer',
  className: 'toki-free-sitelen-pona',
  excludeSelectors: ['[data-locale-switcher]', '#sitelen-layer-toggle-mount'],
  debug: sitelenDebugEnabled,
  debugOverlay: sitelenDebugEnabled,
  baseConfig: sitelenBaseConfig
});

const sitelenPluginOptions = createSitelenLayerPluginOptions({
  storageKey: 'toki-free-kit:sitelen-layer',
  className: 'toki-free-sitelen-pona',
  baseConfig: sitelenBaseConfig
});

export default function SitelenLayerPluginClient(): null {
  const pathname = usePathname();

  useEffect(() => {
    let destroyed = false;
    let plugin: {
      init: () => void;
      destroy: () => void;
    } | null = null;

    async function initPlugin(): Promise<void> {
      const { createSitelenLayerPluginFromProfiles } = await import('sitelen-layer-plugin');

      if (destroyed) {
        return;
      }

      plugin = createSitelenLayerPluginFromProfiles(sitelenProfiles, sitelenPluginOptions);

      plugin.init();
    }

    initPlugin();

    return () => {
      destroyed = true;
      plugin?.destroy();
    };
  }, [pathname]);

  return null;
}
