import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleNameChange = e => {
    this.setState({ name: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const normalizedName = this.state.name.trim();

    this.props.onSubmit(normalizedName);
    console.log(normalizedName);
    if (normalizedName !== '') {
      return this.setState({ name: '' });
    }

    toast('nothing');
    return;
  };

  render() {
    return (
      <header className="searchbar Searchbar">
        <form onSubmit={this.handleSubmit} className="form SearchForm">
          <button type="submit" className="button SearchForm-button">
            <span className="button-label SearchForm-button-label">Search</span>
          </button>

          <input
            className="input SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
