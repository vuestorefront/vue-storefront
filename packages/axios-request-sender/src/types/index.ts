import type { Method } from "axios";

/**
 * Methods currently allowed by the AxiosRequestSender.
 */
export type AllowedMethods = Extract<Method, "get" | "GET" | "post" | "POST">;

/**
 * Type of the customizable error handler.
 */
export type CustomErrorHandler = (error: any) => Promise<any>;
