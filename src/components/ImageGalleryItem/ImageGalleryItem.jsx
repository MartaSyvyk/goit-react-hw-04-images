import css from '../../styles.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, handleClick }) => {
  return (
    <li onClick={handleClick} className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImage} src={url} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
