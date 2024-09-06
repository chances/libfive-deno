import { five } from "./types.ts";
import { five_SYMBOLS } from "./symbols.ts";

export * from "./safe-ffi.ts";
export type { five };

export function load(path: string): typeof five {
  const lib = Deno.dlopen(path, five_SYMBOLS);

  return { ...lib.symbols, $$close: () => lib.close() } as never;
}
