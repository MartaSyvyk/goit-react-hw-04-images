import css from '../../styles.module.css';
import PropTypes from 'prop-types';

export const FetchError = ({ errorMessage }) => {
  return (
    <div className={css.ErrorContainer}>
      <p>No results found on your request '{errorMessage}'</p>
    </div>
  );
};

FetchError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
