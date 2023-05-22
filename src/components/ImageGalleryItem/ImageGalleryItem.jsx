import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <>
      <img
        src={webformatURL}
        alt={tags}
        loading="lazy"
        className={css.ImageGalleryItemImg}
      />
    </>
  );
};

ImageGalleryItem.propType = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
