import { Server } from "http";

export type GlobalThis = typeof globalThis;
export type ExtendedGlobalThis = GlobalThis & { __MIDDLEWARE__: Server };
