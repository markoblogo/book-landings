'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createSitelenLayerProfiles } from '@book-landings/landing-sitelen';

const profiles = createSitelenLayerProfiles({
  storageKey: 'stoic-wisdom-series:sitelen-layer',
  className: 'stoic-sitelen-pona'
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
