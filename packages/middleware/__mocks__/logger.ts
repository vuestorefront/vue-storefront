import { LoggerInterface } from "@vue-storefront/logger";

export const logger = {
  emergency: jest.fn(),
  alert: jest.fn(),
  critical: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  notice: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
} as unknown as LoggerInterface;
