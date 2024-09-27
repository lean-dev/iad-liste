import { useEffect, useState } from "react";

export function useFetch<T>(url: string, initial: T) {
  const [result, setResult] = useState(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      });
  }, [url]);

  return [result, setResult, loading] as const;
}
