import cn from 'classnames';
import { ChangeEvent } from 'react';

import * as s from './TextField.css.ts';

interface Props {
  className?: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

/**
 * Component for displaying a text field
 * @component
 * @param {object} props - Component props
 * @param {string} props.className - Additional CSS class names
 * @param {string} props.placeholder - Placeholder text for the text field
 * @param {string} props.value - The value of the text field
 * @param {function} props.onChange - Callback function for handling text changes
 * @returns {JSX.Element} The rendered TextField component
 */
const TextField = ({
  className,
  placeholder,
  value,
  onChange,
}: Props): JSX.Element => {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value: targetValue } = ev.target;
    onChange?.(targetValue);
  };

  return (
    <div className={cn(s.wrapper, className)}>
      <input
        type="text"
        className={s.textField}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
