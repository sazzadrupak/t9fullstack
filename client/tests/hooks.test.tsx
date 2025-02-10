import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { useThrottledValue, useWords } from '../src/hooks';

const THROTTLE_MS = 500;

describe('useThrottledValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers(); // Crucial for cleaning up between test suites
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() =>
      useThrottledValue('initial', THROTTLE_MS)
    );
    expect(result.current).toBe('initial');
  });

  it('updates the throttled value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ input, delay }) => useThrottledValue(input, delay),
      { initialProps: { input: 'initial', delay: 500 } }
    );

    rerender({ input: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Still initial before delay

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe('updated'); // Updated after delay
  });

  it('only applies the last update if called multiple times within delay', () => {
    const { result, rerender } = renderHook(
      ({ input, delay }) => useThrottledValue(input, delay),
      { initialProps: { input: 'first', delay: 500 } }
    );

    rerender({ input: 'second', delay: 500 });
    act(() => vi.advanceTimersByTime(300));
    rerender({ input: 'third', delay: 500 });
    act(() => vi.advanceTimersByTime(500));

    expect(result.current).toBe('third'); // Only the last input after delay
  });
});

describe('useWords', () => {
  vi.mock('axios');

  // Create a React Query wrapper for testing
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const createWrapper = () => {
    return ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  afterEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
  });

  it('does not fetch data when digits are empty', () => {
    const { result } = renderHook(() => useWords(''), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('fetches words successfully when digits are provided', async () => {
    const mockData = ['apple', 'banana'];
    const mockedAxiosGet = axios.get as Mock<typeof axios.get>;
    mockedAxiosGet.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useWords('23'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
    });

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:8000/words?digits=23'
    );
  });
});
