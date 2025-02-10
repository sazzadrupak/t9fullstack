import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { useThrottledValue, useWords } from '../src/hooks';
import Home from '../src/pages/Home';
import Provider from './provider';

const WORDS = ['hello', 'world'];

vi.mock('../src/hooks', () => ({
  useThrottledValue: vi.fn(),
  useWords: vi.fn(),
}));

const mockUseThrottledValue = useThrottledValue as Mock;
const mockUseWords = useWords as Mock;

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Home component correctly', () => {
    mockUseThrottledValue.mockReturnValue('');
    mockUseWords.mockReturnValue({
      data: null,
      isFetching: false,
      error: null,
    });

    const { getPageHeader, getInput } = renderComponent();
    expect(getPageHeader()).toBeInTheDocument();
    expect(getInput()).toBeInTheDocument();
  });

  it('updates input field correctly', () => {
    mockUseThrottledValue.mockReturnValue('');
    mockUseWords.mockReturnValue({
      data: null,
      isFetching: false,
      error: null,
    });

    const { getInput } = renderComponent();
    const input = getInput();
    fireEvent.change(getInput(), { target: { value: '23' } });
    expect(input).toHaveValue('23');
  });

  it('shows loading skeleton when fetching', () => {
    mockUseThrottledValue.mockReturnValue('23');
    mockUseWords.mockReturnValue({ data: null, isFetching: true, error: null });

    const { getWordsSkeleton } = renderComponent();
    expect(getWordsSkeleton()).toBeInTheDocument();
  });

  it('displays error message when API fails', () => {
    mockUseThrottledValue.mockReturnValue('23');
    mockUseWords.mockReturnValue({
      data: null,
      isFetching: false,
      error: new Error('No Data found'),
    });

    const { getErrorView } = renderComponent();
    expect(getErrorView()).toBeInTheDocument();
  });

  it('renders words list when data is available', async () => {
    mockUseThrottledValue.mockReturnValue('23');
    mockUseWords.mockReturnValue({
      data: WORDS,
      isFetching: false,
      error: null,
    });

    const { expectWordsToBeInTheDocument } = renderComponent();

    expectWordsToBeInTheDocument(WORDS);
  });
});

const renderComponent = () => {
  render(<Home />, { wrapper: Provider });

  const getPageHeader = () => screen.getByText(/T9 Search words/i);
  const getInput = () => screen.getByPlaceholderText('type sequence of digits');

  const getWordsSkeleton = () =>
    screen.queryByRole('progressbar', { name: /words/i });

  const getErrorView = () => screen.getByText(/No Data found/i);

  const expectWordsToBeInTheDocument = (words: string[]) => {
    const rows = screen.getAllByRole('word-row');
    expect(rows).toHaveLength(words.length);

    words.forEach((word) => {
      expect(screen.getByText(word)).toBeInTheDocument();
    });
  };

  return {
    getPageHeader,
    getInput,
    getWordsSkeleton,
    getErrorView,
    expectWordsToBeInTheDocument,
  };
};
