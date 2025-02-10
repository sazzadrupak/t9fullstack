import s from './ErrorMessage.module.scss';

/**
 * Props interface for the ErrorMessage component
 * @interface Props
 * @property {string} error - The error message to be displayed
 */
interface Props {
  error: string;
}

/**
 * Helper function to render the error message
 * @param {object} Props - component accepts error as a prop
 * @param {string} Props.error - error message
 * @returns {JSX.Element} The rendered ErrorMessage component
 */
const ErrorMessage = ({ error }: Props): JSX.Element => {
  return (
    <div className={s.container}>
      <div className={s.error}>
        <strong>Error</strong> - {error}
      </div>
    </div>
  );
};

export default ErrorMessage;
