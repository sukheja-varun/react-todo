import React, { memo } from 'react';
import { useStoreActions, useStoreState } from '../../store';

import TodoForm from '../../components/atoms/TodoForm';
import ViewTodos from '../../components/molecules/ViewTodos';
import { Todo } from '../../types/todo';

import styles from './index.module.scss';

const Todos: React.FC = () => {
  const { addTodo, updateTodo, resetToEdit } = useStoreActions(
    (store) => store.todos
  );
  const { toEdit } = useStoreState((store) => store.todos);

  const onSubmit = (todo: Todo) => {
    if (toEdit) {
      updateTodo({ data: todo });
      resetToEdit();
    } else {
      addTodo({ data: todo });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Tasks</div>
      <TodoForm todo={toEdit} onSubmit={onSubmit} onCancel={resetToEdit} />
      <ViewTodos />
    </div>
  );
};
export default memo(Todos);
