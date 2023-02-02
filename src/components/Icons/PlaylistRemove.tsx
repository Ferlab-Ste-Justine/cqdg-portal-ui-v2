/* eslint-disable max-len */
import { IconProps } from 'components/Icons';

const PlaylistRemove = ({ className = '', width = '12', height = '12' }: IconProps) => (
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
      d="M0 0H12V2H0V0ZM0 4H12V6H0V4ZM17.8894 8.81838L16.6166 7.54558L14.0711 10.0912L11.5255 7.54558L10.2527 8.81838L12.7983 11.364L10.2527 13.9095L11.5255 15.1823L14.0711 12.6368L16.6166 15.1823L17.8894 13.9095L15.3439 11.364L17.8894 8.81838ZM8 10H0V8H8V10Z"
    />
  </svg>
);

export default PlaylistRemove;
