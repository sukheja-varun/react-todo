import React, { KeyboardEvent, memo } from 'react';
import { Todo } from '../../../types/todo';

import styles from './index.module.scss';

interface TodoTaskProps {
  todo: Todo;
  onClick: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}
const TodoTask: React.FC<TodoTaskProps> = (props) => {
  const { todo, onClick, onEdit, onDelete } = props;

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
      <div
        className={`${styles.title} ${
          todo.completed ? styles.completedTitle : ''
        }`}
      >
        {todo.title}
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(todo);
        }}
      >
        <img src="assets/edit.svg" alt="edit" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo);
        }}
      >
        <img src="assets/delete.svg" alt="delete" />
      </button>
    </div>
  );
};
export default memo(TodoTask);
