// import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  smallImage,
  tags,
  largeImage,
  onModal,
}) => (
  <li className="gallery-item ImageGalleryItem" key={id}>
    <img
      className="ImageGalleryItem-image"
      src={smallImage}
      alt={tags}
      onClick={() => {
        onModal(largeImage);
      }}
    />
  </li>
);
