import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ onLoadMore }) => (
  <button className="Button" type="button" onClick={onLoadMore}>
    Load more
  </button>
);

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
