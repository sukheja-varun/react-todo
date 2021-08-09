import React, { memo, useEffect, useState } from 'react';
import Chip from '../../atoms/Chip';

import styles from './index.module.scss';

export enum SortBy {
  Order = 'order',
  Title = 'title',
}

interface ComponentNameProps {
  onChange: (sort: string) => void;
}
const ComponentName: React.FC<ComponentNameProps> = (props) => {
  const { onChange } = props;
  const sortByList = [SortBy.Order, SortBy.Title];

  const [selectedSort, setSelectedSort] = useState(sortByList[0]);

  useEffect(() => {
    onChange(selectedSort);
  }, [selectedSort]);

  return (
    <div className={styles.container}>
      <span>Sort By:</span>
      {sortByList.map((item) => (
        <Chip
          key={item}
          title={item}
          onClick={() => setSelectedSort(item)}
          active={item === selectedSort}
        />
      ))}
    </div>
  );
};
export default memo(ComponentName);
