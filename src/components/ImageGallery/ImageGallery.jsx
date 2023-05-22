import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ hits, onData }) => (
  <ul className={css.ImageGallery}>
    {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
      <li
        className={css.ImageGalleryItem}
        key={id}
        onClick={() => {
          onData(tags, largeImageURL);
        }}
      >
        <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
      </li>
    ))}
  </ul>
);

ImageGallery.propType = {
  onData: PropTypes.string.isRequired,
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
export default ImageGallery;
