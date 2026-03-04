declare module '#imports' {
  export function useRuntimeConfig<T extends Record<string, unknown> = Record<string, unknown>>(): T;
}
