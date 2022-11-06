import { MessageImageWrapper, NotificationMessage } from './Message.styled';
import PropTypes from 'prop-types';
import cat from '../images/cat.jpg';
import aaa from '../images/kamikaze.jpg';

export const Message = ({ message, status }) => (
  <MessageImageWrapper>
    <NotificationMessage>{message}</NotificationMessage>
    {(status === 'idle' || status === 'empty') && <img alt="cat" src={cat} />}
    {status === 'error' && <img alt="cat" src={aaa} />}
  </MessageImageWrapper>
);

Message.propTypes = { message: PropTypes.string.isRequired };
