import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
  ref = null,
}) {
  return (
    <li className={s.ImageGalleryItem} ref={ref}>
      <img
        className={s.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={onClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
