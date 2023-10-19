import { initSDK } from "./bootstrap";
import { eventManager } from "./events/EventManager";
import { buildModule } from "./module/buildModule";
import { handleError } from "./error";

/**
 * An old alias for initSDK function.
 *
 * @deprecated
 */
const initVSFSDK = initSDK;

export { initVSFSDK, initSDK, handleError, buildModule, eventManager };
export * from "./types";
