import { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook to check if a component is currently mounted.
 * 
 * This hook provides a stable function that returns true if the component
 * is mounted and false if it's unmounted. Useful for preventing state updates
 * on unmounted components, which can cause memory leaks and warnings.
 * 
 * @returns A memoized function that returns the current mount status
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMounted = useIsMounted();
 *   const [data, setData] = useState(null);
 * 
 *   useEffect(() => {
 *     fetchData().then(result => {
 *       if (isMounted()) {
 *         setData(result);
 *       }
 *     });
 *   }, [isMounted]);
 * 
 *   return <div>{data}</div>;
 * }
 * ```
 * 
 * @see https://usehooks-ts.com/react-hook/use-is-mounted
 */
export function useIsMounted(): () => boolean {
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return useCallback(() => isMountedRef.current, []);
}
