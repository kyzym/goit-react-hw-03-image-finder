import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ onLoadMore, status }) => (
  <>
    {status === 'pending' ? (
      <Loader />
    ) : (
      <button className="Button" onClick={onLoadMore}>
        Load more
      </button>
    )}
  </>
);

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
