import { Component } from 'react';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

import { fetchPictures } from './api/imageAPI';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { StartMessage } from './notes/StartMessage';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    name: '',
    page: 1,
    totalImages: 0,
    largeImage: '',
    status: 'idle',
  };

  handleFormSubmit = name => {
    this.setState({
      name,
      page: 1,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onModal = e => {
    this.setState({ largeImage: e });
  };

  clearImage = () => {
    this.setState({ largeImage: '' });
  };

  async componentDidUpdate(_, prevState) {
    const { name, page } = this.state;

    if (prevState.name === name && prevState.page === page) {
      return;
    }

    this.setState({ status: 'pending' });

    try {
      const fetchedImages = await fetchPictures(name, page);
      const { hits } = fetchedImages;

      if (hits.length === 0) {
        return this.setState({ status: 'empty' });
      }

      this.setState({
        images:
          page === 1 ? fetchedImages.hits : [...this.state.images, ...hits],
        totalImages: fetchedImages.totalHits,
        status: 'resolved',
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { handleFormSubmit, onLoadMore, onModal, clearImage } = this;
    const { images, status, totalImages, page, largeImage } = this.state;
    const restOfImages = totalImages - page * 12;

    return (
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'pending' && totalImages === 0 && <Loader />}

        {status === 'idle' && <StartMessage />}
        {status === 'empty' && <p>nothing</p>}

        {<ImageGallery images={images} onModal={onModal} />}
        {restOfImages > 0 && (
          <LoadMoreBtn onLoadMore={onLoadMore} status={status} />
        )}

        {largeImage && (
          <Modal clearImage={clearImage}>
            <img src={largeImage} alt="" />
          </Modal>
        )}

        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
