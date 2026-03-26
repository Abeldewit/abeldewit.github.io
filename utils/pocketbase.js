import PocketBase from 'pocketbase'

/**
 * Returns a PocketBase client configured from runtimeConfig.
 * Call inside setup functions, composables, or useAsyncData callbacks.
 *
 * The base URL is set via the NUXT_PUBLIC_POCKETBASE_URL environment variable,
 * defaulting to http://localhost:8090 for local development.
 */
export function usePb() {
  const config = useRuntimeConfig()
  return new PocketBase(config.public.pocketbaseUrl)
}
