import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  // Return both the debounced value and a function to clear it immediately
  return {
    debouncedValue,
    clearImmediate: () => setDebouncedValue(""),
  };
};
