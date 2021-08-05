import React, { memo } from 'react';
import ViewTodos from '../../components/molecules/ViewTodos';

import styles from './index.module.scss';

const Todos: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Tasks</div>
      <ViewTodos />
    </div>
  );
};
export default memo(Todos);
