export interface PurgeCSSOptions {
  enabled?: boolean;
  paths?: string[];
}

export interface ModuleOptions {
  coreDevelopment?: boolean;
  i18nExtension?: boolean;
  e2e?: boolean;
  logger?: boolean;
  ssr?: boolean;
  context?: boolean;
  sfui?: boolean;
  performance?: {
    httpPush?: boolean;
    purgeCSS?: PurgeCSSOptions;
  };
  useRawSource?: {
    dev: string[];
    prod: string[];
  };
}

export interface Log {
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
}
