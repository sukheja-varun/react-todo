import React, { memo } from 'react';

import styles from './index.module.scss';

interface ChipProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
}
const Chip: React.FC<ChipProps> = (props) => {
  const { title, active, onClick } = props;
  return (
    <button
      type="button"
      className={`${styles.chip} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default memo(Chip);
