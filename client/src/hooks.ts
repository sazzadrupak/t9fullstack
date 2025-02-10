import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * Custom hook to throttle the value of an input.
 * @param input The input value to be throttled.
 * @param delay The delay in milliseconds between updates.
 * @returns The throttled input value.
 */
export function useThrottledValue<T>(input: T, delay: number): T {
  const [throttledInput, setThrottledInput] = useState<T>(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setThrottledInput(input);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [input, delay]);
  return throttledInput;
}

/**
 * Custom hooks for fetching words based on the given digits
 * @param {string} digits - The digits to be used for fetching words
 * @returns - An object containing the fetched words, loading state, and error state
 */
export const useWords = (digits: string) =>
  useQuery<string[], Error>({
    queryKey: ['words', digits],
    queryFn: () =>
      axios
        .get<string[]>(`http://localhost:8000/words?digits=${digits}`)
        .then((res) => res.data),
    enabled: !!digits,
  });
