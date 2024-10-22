import type { LoggerInterface } from "@vue-storefront/logger";
import type { IntegrationContext, MiddlewareConfig } from "../types";

const GLOBAL_MIDDLEWARE_CFG_KEY = Symbol("GLOBAL_MIDDLEWARE_CFG_KEY");

/**
 * Internal class responsible for spawning minimal amount of Logger's instances
 * on boostrap of the application.
 *
 * @example Spawning minimal amount of Logger's instances and accessing it
 * ```ts
 * const config = // ... it's whole middleware's config
 * const buildLogger = (loggerConfig) => LoggerFactory.create(LoggerType.ConsolaGcp, loggerConfig); // function responsible for creating new instance of Logger, it gets already resolved configuration for new instance as an argument
 *
 * const loggerManager = new LoggerManager(
 *  config,
 *  buildLogger
 * );
 * ```
 */
export class LoggerManager<TLoggerConfig = unknown> {
  private instances: Record<string | symbol, LoggerInterface> = {};

  constructor(
    config: MiddlewareConfig<Record<string, IntegrationContext>>,
    buildLogger: (logger: TLoggerConfig) => LoggerInterface
  ) {
    // Global Logger
    this.instances[GLOBAL_MIDDLEWARE_CFG_KEY] = this.selectLogger(
      config,
      buildLogger
    );

    // Logger for every integration having custom logger config
    for (const [integrationName, integrationEntry] of Object.entries(
      config.integrations
    )) {
      if (this.hasCustomLoggerConfig(integrationEntry)) {
        this.instances[integrationName] = this.selectLogger(
          this.mergeConfigs(integrationEntry, config),
          buildLogger,
          integrationName
        );
      }
    }
  }

  /**
   * Merges integration's logger config with global's logger config
   */
  private mergeConfigs(
    integrationConfig: MiddlewareConfig<
      Record<string, IntegrationContext>
    >["integrations"][string],
    globalConfig: MiddlewareConfig<Record<string, IntegrationContext>>
  ) {
    return {
      ...integrationConfig,
      logger: {
        ...globalConfig.logger,
        ...integrationConfig.logger,
      },
    };
  }

  /**
   * Selects custom logger provided by user with fallback to default logger.
   * Prints console.warn if provided redudant custom options with custom handler.
   */
  private selectLogger(config, buildLogger, tag = "global") {
    const logger =
      config.logger?.handler || buildLogger(config.logger as TLoggerConfig);
    if (config.logger?.handler) {
      if (Object.keys(config.logger).length > 1) {
        /**
         * This codeblock will be triggered if end-developer provided custom logger and custom options.
         * As they might think custom options will be provided to the logger, then their logger could stop working.
         * That's why we decided to use console instead of created logger here.
         */
        // eslint-disable-next-line no-console
        console.warn(
          `Both handler and options are provided to ${tag} logger's options. Using handler, options will be ignored.`
        );
      }
    }

    return logger;
  }

  /**
   * Check if integration's config has configuration for dedicated logger instance.
   */
  private hasCustomLoggerConfig(integrationEntry) {
    return Boolean(integrationEntry.logger);
  }

  /**
   * Returns instance of logger for requested integration from internal storage.
   * Called without an argument returns instance of global logger.
   */
  public get(integrationName?: string) {
    return (
      this.instances[integrationName] ||
      this.instances[GLOBAL_MIDDLEWARE_CFG_KEY]
    );
  }
}
