import { useEffect, useRef, useState } from 'react';

export function useFetch<T = unknown>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!url) {
      const err = new Error('No URL provided. Skipping fetch.');
      setError(err);
      return;
    }

    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Network error: ${res.status} ${res.statusText}`);
        }

        const json = (await res.json()) as T;

    
        if (controllerRef.current === controller) {
          setData(json);
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') return; 
        if (controllerRef.current === controller) {
          setError(err);
        }
      } finally {
        if (controllerRef.current === controller) {
          setLoading(false);
        }
      }
    })();

    return () => {
      controllerRef.current?.abort();
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    };
  }, [url]);

  return { data, loading, error } as const;
}
