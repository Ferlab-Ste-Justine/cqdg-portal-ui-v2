/* eslint-disable max-len */
import { IconProps } from 'components/Icons';

const PlaylistAdd = ({ className = '', width = '12', height = '12' }: IconProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H12V2H0V0ZM0 4H12V6H0V4ZM16 4H14V8H10V10H14V14H16V10H20V8H16V4ZM8 10H0V8H8V10Z"
    />
  </svg>
);

export default PlaylistAdd;
