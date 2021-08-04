import React, { memo } from 'react';

import styles from './index.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src="assets/todo.svg" alt="todo icon" />
      <span>Todo App</span>
    </header>
  );
};
export default memo(Header);
