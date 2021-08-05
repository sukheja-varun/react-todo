import React, { memo } from 'react';
import { useStoreActions } from '../../store';

import AddTodo from '../../components/atoms/TodoForm';
import ViewTodos from '../../components/molecules/ViewTodos';
import { Todo } from '../../types/todo';

import styles from './index.module.scss';

const Todos: React.FC = () => {
  const { addTodo } = useStoreActions((store) => store.todos);

  const onCreate = (todo: Todo) => {
    addTodo({ data: todo });
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Tasks</div>
      <AddTodo onCreate={onCreate} />
      <ViewTodos />
    </div>
  );
};
export default memo(Todos);
