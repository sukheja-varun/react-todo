import React, { KeyboardEvent, memo } from 'react';
import { Todo } from '../../../types/todo';

import styles from './index.module.scss';

interface TodoTaskProps {
  todo: Todo;
  onClick: (todo: Todo) => void;
}
const TodoTask: React.FC<TodoTaskProps> = (props) => {
  const { todo, onClick } = props;

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick(todo);
    }
  };

  return (
    <div
      className={styles.container}
      role="button"
      onClick={() => onClick(todo)}
      onKeyPress={handleKeyPress}
      tabIndex={0}
    >
      <img
        src={`assets/${todo.completed ? 'checked' : 'not-checked'}.svg`}
        alt="checkbox"
      />
      <span
        className={`${styles.title} ${
          todo.completed ? styles.completedTitle : ''
        }`}
      >
        {todo.title}
      </span>
    </div>
  );
};
export default memo(TodoTask);
