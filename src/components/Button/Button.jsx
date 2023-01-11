import css from '../../styles.module.css';
import PropTypes from 'prop-types';

export const Button = ({ handleClick }) => {
  return (
    <button
      id="loadBtn"
      type="submit"
      className={css.Button}
      onClick={handleClick}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
