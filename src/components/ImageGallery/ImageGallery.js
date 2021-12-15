import { useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import PropTypes, { shape } from 'prop-types';

export default function ImageGallery({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = largeImageURL => {
    setImageModal(largeImageURL);
    toggleModal();
  };

  const onArrowRight = () => {
    const sourceImg = images.map(({ largeImageURL }) => {
      return largeImageURL;
    });
    let indexOfImg = sourceImg.indexOf(imageModal);

    if (indexOfImg + 1 > sourceImg.length - 1) {
      indexOfImg = -1;
    }
    setImageModal(sourceImg[indexOfImg + 1]);
  };

  const onArrowLeft = () => {
    const sourceImg = images.map(({ largeImageURL }) => {
      return largeImageURL;
    });
    let indexOfImg = sourceImg.indexOf(imageModal);

    if (indexOfImg === 0) {
      indexOfImg = sourceImg.length;
    }
    setImageModal(sourceImg[indexOfImg - 1]);
  };

  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onClick={() => {
                handleClick(largeImageURL);
              }}
            />
          );
        })}
      </ul>
      {showModal && (
        <Modal
          imageModal={imageModal}
          onClose={toggleModal}
          onArrowRight={onArrowRight}
          onArrowLeft={onArrowLeft}
        />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
};
