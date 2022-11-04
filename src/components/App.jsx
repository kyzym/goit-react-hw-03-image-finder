import { Component } from 'react';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

import { fetchPictures } from './api/imageAPI';

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

    if (prevState.name !== name) {
      const fetchedImages = await fetchPictures(name, page);
      return this.setState({ images: fetchedImages.hits });
    }
  }

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
