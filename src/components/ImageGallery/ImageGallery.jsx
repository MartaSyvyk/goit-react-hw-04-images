import css from '../../styles.module.css';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ data, handleClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {data.map(object => (
        <ImageGalleryItem
          key={object.id}
          url={object.webformatURL}
          handleClick={() => handleClick(object.id)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string,
    })
  ),
  handleClick: PropTypes.func.isRequired,
};
