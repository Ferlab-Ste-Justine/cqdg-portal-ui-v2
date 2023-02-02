/* eslint-disable max-len */
import { IconProps } from 'components/Icons';

const PlaylistAdd = ({ className = '', width = '16', height = '16' }: IconProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.33334 4H9.33334V5.33333H1.33334V4ZM1.33334 6.66667H9.33334V8H1.33334V6.66667ZM12 9.33333V6.66667H10.6667V9.33333H8.00001V10.6667H10.6667V13.3333H12V10.6667H14.6667V9.33333H12ZM6.66668 10.6667H1.33334V9.33333H6.66668V10.6667Z"
    />
  </svg>
);

export default PlaylistAdd;
