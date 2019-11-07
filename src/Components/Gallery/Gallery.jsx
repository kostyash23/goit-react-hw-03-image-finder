import React from 'react';
import PropTypes from 'prop-types';
import styles from './Gallery.module.css';
import PhotoCard from '../PhotoCard/PhotoCard';

const Gallery = ({ gallery, openModal }) => {
  const ids = require('short-id');
  return (
    <>
      <ul className={styles.gallery}>
        {gallery.map(el => (
          <PhotoCard {...el} key={ids.generate()} openModal={openModal} />
        ))}
      </ul>
    </>
  );
};
Gallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
      downloads: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Gallery;
