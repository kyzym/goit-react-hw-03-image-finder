import { ImageGalleryItem } from 'ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => (
  <ul className="gallery ImageGallery">
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        smallImage={image.webformatURL}
        tags={image.tags}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
