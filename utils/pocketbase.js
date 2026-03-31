import PocketBase from 'pocketbase'

/**
 * Returns a PocketBase client configured from runtimeConfig.
 * Call inside setup functions, composables, or useAsyncData callbacks.
 *
 * On the server (SSR / Docker): uses pocketbaseInternalUrl so the Node.js
 * process reaches Pocketbase over the Docker internal network without going
 * through the public internet. Falls back to the public URL when the internal
 * URL is not set (e.g. local development without Docker).
 *
 * In the browser: always uses the public pocketbaseUrl so that rendered links
 * (e.g. resume download) point to a reachable address.
 */
export function usePb() {
  const config = useRuntimeConfig()
  const url = import.meta.server
    ? (config.pocketbaseInternalUrl || config.public.pocketbaseUrl)
    : config.public.pocketbaseUrl
  return new PocketBase(url)
}
