/* eslint-disable max-len */
import { IconProps } from 'components/Icons';

const PlaylistRemove = ({ className = '', width = '16', height = '16' }: IconProps) => (
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
      d="M1.33334 4H9.33334V5.33333H1.33334V4ZM1.33334 6.66667H9.33334V8H1.33334V6.66667ZM13.2596 9.87892L12.4111 9.03039L10.7141 10.7274L9.01699 9.03039L8.16847 9.87892L9.86552 11.576L8.16847 13.273L9.01699 14.1216L10.7141 12.4245L12.4111 14.1216L13.2596 13.273L11.5626 11.576L13.2596 9.87892ZM6.66668 10.6667H1.33334V9.33333H6.66668V10.6667Z"
    />
  </svg>
);

export default PlaylistRemove;
