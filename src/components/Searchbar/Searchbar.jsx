import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  render() {
    return (
      <header class="searchbar Searchbar">
        <form class="form SearchForm">
          <button type="submit" class="button SearchForm-button">
            <span class="button-label SearchForm-button-label">Search</span>
          </button>

          <input
            class="input SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
