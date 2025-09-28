import { useCallback, useEffect, useRef } from "react"

/**
 * React hook to check if a component is currently mounted.
 *
 * Returns a stable function that indicates the mount status.
 * Useful for preventing state updates on unmounted components.
 *
 * @returns A memoized function returning `true` if mounted, otherwise `false`.
 *
 * @example
 * const isMounted = useIsMounted();
 *
 * useEffect(() => {
 *   fetchData().then(result => {
 *     if (isMounted()) {
 *       setData(result);
 *     }
 *   });
 * }, [isMounted]);
 */
export function useIsMounted(): () => boolean {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return useCallback(() => mountedRef.current, [])
}
