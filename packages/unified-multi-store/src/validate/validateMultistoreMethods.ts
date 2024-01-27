import { MultistoreExtensionMethods } from "../types";
import { requiredMethodsErrors } from "./requiredMethodsErrors";

/**
 * Validates if multi-store extension methods exists in the configuration input.
 */
export const validateMultistoreMethods = (
  methodName: string,
  multistore?: MultistoreExtensionMethods
) => {
  if (!multistore[methodName]) {
    console.error(requiredMethodsErrors[methodName]);
    throw new Error(requiredMethodsErrors[methodName]);
  }
};
