import { StartImageWrapper } from './StartMessage.styled';
import cat from '../images/cat.jpg';

export const StartMessage = () => (
  <StartImageWrapper>
    <p>Need to try find something</p>
    <img alt="cat" src={cat} />
  </StartImageWrapper>
);
