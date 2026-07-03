'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createSitelenLayerProfiles } from '@book-landings/landing-sitelen';

const profiles = createSitelenLayerProfiles({
  storageKey: 'dao-toki:sitelen-layer',
  className: 'dao-toki-sitelen-pona',
  excludeSelectors: ['[data-locale-switcher]', '#sitelen-layer-toggle-mount'],
  includeTitleOnToggleLabels: true
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

      plugin = createSitelenLayerPluginFromProfiles(profiles);

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
