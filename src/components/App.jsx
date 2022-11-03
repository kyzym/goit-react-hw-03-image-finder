import { Component } from 'react';
import { ImageGallery } from './ImageGallery/imageGallery-api';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <Searchbar />
        <ImageGallery />
      </div>
    );
  }
}
