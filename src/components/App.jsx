import { Component } from 'react';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

import { fetchPictures } from './api/imageAPI';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
// import { toast } from 'react-toastify';
// import { StartMessage } from './notes/StartMessage';

export class App extends Component {
  state = {
    images: [],
    name: '',
    page: 1,
    totalImages: 0,
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

  async componentDidUpdate(_, prevState) {
    const { name, page } = this.state;

    if (prevState.name === name && prevState.page === page) {
      return;
    }

    this.setState({ status: 'pending' });

    try {
      const fetchedImages = await fetchPictures(name, page);

      this.setState({
        images:
          page === 1
            ? fetchedImages.hits
            : [...this.state.images, ...fetchedImages.hits],
        totalImages: fetchedImages.totalHits,
        status: 'resolved',
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { handleFormSubmit, onLoadMore } = this;
    const { images, status, totalImages, page } = this.state;
    const restOfImages = totalImages - page * 12;

    return (
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'pending' && totalImages === 0 && <Loader />}
        {/* {status === 'idle' && <StartMessage />} */}

        {<ImageGallery images={images} />}
        {restOfImages > 0 && (
          <LoadMoreBtn onLoadMore={onLoadMore} status={status} />
        )}

        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
