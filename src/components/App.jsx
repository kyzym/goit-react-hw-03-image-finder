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
    showModal: false,
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onModal = e => {
    this.setState({ largeImage: e });
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
    const { handleFormSubmit, onLoadMore, toggleModal, onModal } = this;
    const { images, status, totalImages, page, largeImage, showModal } =
      this.state;
    const restOfImages = totalImages - page * 12;

    return (
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'pending' && totalImages === 0 && <Loader />}

        {status === 'idle' && <StartMessage />}
        {status === 'empty' && <p>nothing</p>}

        {
          <ImageGallery
            images={images}
            showModal={toggleModal}
            onModal={onModal}
          />
        }
        {restOfImages > 0 && (
          <LoadMoreBtn onLoadMore={onLoadMore} status={status} />
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}

        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
