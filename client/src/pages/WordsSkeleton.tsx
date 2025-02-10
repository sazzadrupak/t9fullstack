import Skeleton from '../components/Skeleton';

import * as s from './WordsSkeleton.css.ts';

/**
 * Component for mimicking the layout of the words page while data is loading
 * @component
 * @returns {JSX.Element} The rendered Layout component
 */
const WordsSkeleton = (): JSX.Element => {
  const words = [1, 2, 3, 4];
  return (
    <div role="progressbar" aria-label="loading words" className={s.container}>
      {words.map((word) => (
        <div key={word} className={s.wordRow}>
          <Skeleton className={s.skeleton} />
        </div>
      ))}
    </div>
  );
};

export default WordsSkeleton;
