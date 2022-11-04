import { Component } from 'react';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

import { fetchPictures } from './api/imageAPI';
import { LoadMoreBtn } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    name: '',
    page: 1,
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

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    console.log(page, '---page', prevState.page, '---prev-page');

    if (prevState.name === name && prevState.page === page) {
      return;
    }

    const fetchedImages = await fetchPictures(name, page);

    this.setState({
      images:
        page === 1
          ? fetchedImages.hits
          : [...this.state.images, ...fetchedImages.hits],
    });

    return;
  }

  render() {
    const { handleFormSubmit, onLoadMore } = this;
    const { images } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} />
        {images.length > 0 && <LoadMoreBtn onLoadMore={onLoadMore} />}
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
