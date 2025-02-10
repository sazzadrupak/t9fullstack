import * as s from './Words.css.ts';
interface Props {
  words: string[];
}

/**
 * Component for displaying the words page
 * @component
 * @param {object} props - Component props
 * @param {string[]} props.words - Array of words to be displayed
 * @returns {JSX.Element} The rendered Words component
 */
const Words = ({ words }: Props): JSX.Element => {
  return (
    <div className={s.container}>
      {words.map((word, index) => (
        <div key={index} className={s.wordRow} role="word-row">
          <div className={s.word}>{word}</div>
        </div>
      ))}
    </div>
  );
};

export default Words;
