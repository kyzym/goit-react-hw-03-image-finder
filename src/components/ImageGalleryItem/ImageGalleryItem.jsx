// import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  smallImage,
  tags,
  largeImage,
  onModal,
  showModal,
}) => (
  <li className="gallery-item ImageGalleryItem" key={id} onClick={showModal}>
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
