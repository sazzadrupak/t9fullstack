import { useState } from 'react';

import ErrorMessage from '../components/ErrorMessage';
import TextField from '../components/TextField';
import Words from './Words';
import WordsSkeleton from './WordsSkeleton';

import { useThrottledValue, useWords } from '../hooks';
import s from './Home.module.scss';

const THROTTLE_MS = 500;

/**
 * Component for displaying the home page
 * @component
 * @returns {JSX.Element} The rendered Layout component
 */
const Home = (): JSX.Element => {
  const [filterText, setFilterText] = useState('');
  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  const throttledInput = useThrottledValue(filterText, THROTTLE_MS);
  const { data: words, isFetching, error } = useWords(throttledInput);

  return (
    <div className={s.container}>
      <div className={s.header}>T9 Search words</div>
      <div className={s.textFieldContainer}>
        <TextField
          className={s.textField}
          value={filterText}
          placeholder="type sequence of digits"
          onChange={handleFilterTextChange}
        />
      </div>
      {isFetching && <WordsSkeleton />}
      {error && <ErrorMessage error={error.message} />}
      {words && <Words words={words} />}
    </div>
  );
};

export default Home;
