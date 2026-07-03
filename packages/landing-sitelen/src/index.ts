export interface SitelenFeatureConfig {
  enabled: boolean;
  locale: string;
  tokiPonaLocale?: string;
  scopeAttribute?: "data-sitelen-layer-scope";
  ignoreAttribute?: "data-sitelen-layer-ignore";
  localeSwitcherAttribute?: "data-locale-switcher";
  toggleMountSelector?: string;
}

export interface SitelenLayerProfile {
  id: string;
  priority: number;
  match: {
    pathnamePrefix: string;
  };
  config: Record<string, unknown>;
}

export interface SitelenLayerProfileOptions {
  enabledPathnamePrefix?: string;
  disabledPathnamePrefix?: string;
  storageKey: string;
  className: string;
  container?: string;
  toggleMount?: string;
  fontFamily?: string;
  excludeSelectors?: string[];
  debug?: boolean;
  debugOverlay?: boolean;
  baseConfig?: Record<string, unknown>;
  includeTitleOnToggleLabels?: boolean;
}

export const SITELEN_EXCLUDE_SELECTORS = [
  "[data-locale-switcher]",
  "#sitelen-layer-toggle-mount",
  "[data-sitelen-layer-ignore]"
] as const;

export const SITELEN_RUNTIME_NOTES = [
  "Enable only on toki pona routes, usually /tp.",
  "Do not add data-sitelen-layer-scope to /en or other non-TP routes.",
  "Protect language switchers with data-locale-switcher.",
  "Protect footer/contact/legal text with data-sitelen-layer-ignore when needed.",
  "Verify the plugin toggle mounts at #sitelen-layer-toggle-mount."
] as const;

export function createSitelenLayerProfiles(options: SitelenLayerProfileOptions): SitelenLayerProfile[] {
  const container = options.container ?? "main";
  const toggleMount = options.toggleMount ?? "#sitelen-layer-toggle-mount";
  const excludeSelectors = options.excludeSelectors ?? [...SITELEN_EXCLUDE_SELECTORS];
  const sitelenPonaLabel = options.includeTitleOnToggleLabels
    ? { text: "SP", ariaLabel: "Sitelen pona mode", title: "Sitelen pona" }
    : { text: "SP", ariaLabel: "Sitelen pona mode" };
  const sitelenEmojiLabel = options.includeTitleOnToggleLabels
    ? { text: "🙂", ariaLabel: "Sitelen emoji mode", title: "Sitelen emoji" }
    : { text: "🙂", ariaLabel: "Sitelen emoji mode" };

  return [
    {
      id: "tp-locale",
      priority: 20,
      match: { pathnamePrefix: options.enabledPathnamePrefix ?? "/tp" },
      config: {
        container,
        layers: ["latin", "sitelen-pona", "sitelen-emoji"],
        defaultLayer: "latin",
        storageKey: options.storageKey,
        requireDominantTokiPona: true,
        threshold: 0.7,
        showToggle: true,
        toggleMount,
        toggleMode: "auto",
        toggleSize: "lg",
        toggleLabels: {
          latin: "TP",
          "sitelen-pona": sitelenPonaLabel,
          "sitelen-emoji": sitelenEmojiLabel
        },
        excludeSelectors,
        debug: options.debug ?? false,
        debugOverlay: options.debugOverlay ?? false,
        mutationObserver: {
          enabled: true,
          incremental: true,
          observeAttributes: false,
          debounceMs: 140
        },
        sitelenPona: {
          enabled: true,
          fontFamily: options.fontFamily ?? "'sitelen seli kiwen asuki', 'nasin nanpa', sans-serif",
          className: options.className,
          renderStrategy: "ligature-font"
        }
      }
    },
    {
      id: "non-tp-locale",
      priority: 10,
      match: { pathnamePrefix: options.disabledPathnamePrefix ?? "/en" },
      config: {
        container,
        excludeSelectors,
        showToggle: false,
        layers: ["latin"],
        defaultLayer: "latin",
        requireDominantTokiPona: true,
        debug: false,
        debugOverlay: false
      }
    }
  ];
}

export function createSitelenLayerPluginOptions(options: SitelenLayerProfileOptions): Record<string, unknown> | undefined {
  return options.baseConfig ? { baseConfig: options.baseConfig } : undefined;
}

export function shouldEnableSitelen(config: SitelenFeatureConfig): boolean {
  return config.enabled && config.locale === (config.tokiPonaLocale ?? "tp");
}

export function sitelenScopeProps(config: SitelenFeatureConfig): Record<string, string> {
  if (!shouldEnableSitelen(config)) return {};
  return { [config.scopeAttribute ?? "data-sitelen-layer-scope"]: "" };
}

export function protectLanguageSwitcherProps(): Record<string, string> {
  return { "data-locale-switcher": "" };
}

export function protectFromSitelenProps(): Record<string, string> {
  return { "data-sitelen-layer-ignore": "" };
}
