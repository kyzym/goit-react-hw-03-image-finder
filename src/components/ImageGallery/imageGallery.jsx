import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, showModal, onModal }) => (
  <>
    <ul className="gallery ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          smallImage={image.webformatURL}
          largeImage={image.largeImageURL}
          tags={image.tags}
          showModal={showModal}
          onModal={onModal}
        />
      ))}
    </ul>
  </>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
