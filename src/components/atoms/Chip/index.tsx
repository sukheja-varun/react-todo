import React, { memo } from 'react';

import styles from './index.module.scss';

interface ChipProps {
  title: string;
  active?: boolean;
}
const Chip: React.FC<ChipProps> = (props) => {
  const { title, active } = props;
  return (
    <div className={`${styles.chip} ${active ? styles.active : ''}`}>
      {title}
    </div>
  );
};
export default memo(Chip);
