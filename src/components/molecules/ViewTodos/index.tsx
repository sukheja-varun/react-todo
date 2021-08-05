import React, { memo, useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store';
import { Todo } from '../../../types/todo';
import TodoTask from '../../atoms/TodoTask';

import styles from './index.module.scss';

const API_RECORDS_LIMIT = 10;

const ViewTodos: React.FC = () => {
  // Store
  const { getTodos, updateTodo } = useStoreActions((store) => store.todos);
  const { completedTodos, incompleteTodos, hasMoreData } = useStoreState(
    (store) => store.todos
  );

  // State
  const [todosPageNumber, setTodosPageNumber] = useState(1);

  const toggleTodoCompletion = (todo: Todo) => {
    const newTodo: Todo = { ...todo, completed: !todo.completed };
    updateTodo({ data: newTodo });
  };

  useEffect(() => {
    getTodos({ params: { _limit: API_RECORDS_LIMIT, _page: todosPageNumber } });
  }, [todosPageNumber]);

  return (
    <div className={styles.container}>
      {/* In-complete Todos */}
      <div>
        <div>To-do</div>
        <ul>
          {incompleteTodos.map((task) => (
            <li key={task.id}>
              <TodoTask todo={task} onClick={toggleTodoCompletion} />
            </li>
          ))}
        </ul>
        {hasMoreData && (
          <div
            className="pointer"
            role="button"
            onClick={() => setTodosPageNumber(todosPageNumber + 1)}
            tabIndex={0}
            onKeyPress={(e) =>
              e.key === 'Enter' && setTodosPageNumber(todosPageNumber + 1)
            }
          >
            Load More...
          </div>
        )}
      </div>
      {/* completed Todos */}
      <div>
        <div>Completed</div>
        <ul>
          {completedTodos.map((task) => (
            <li key={task.id}>
              <TodoTask todo={task} onClick={toggleTodoCompletion} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default memo(ViewTodos);
