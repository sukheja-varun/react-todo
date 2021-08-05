import React, { memo, useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store';
import TodoTask from '../../atoms/TodoTask';

import styles from './index.module.scss';

const API_RECORDS_LIMIT = 10;

const ViewTodos: React.FC = () => {
  // Store
  const { getTodos } = useStoreActions((store) => store.todos);
  const { completedTodos, incompleteTodos } = useStoreState(
    (store) => store.todos
  );

  // State
  const [todosPageNumber] = useState(0);

  useEffect(() => {
    getTodos({ params: { _limit: API_RECORDS_LIMIT, _page: todosPageNumber } });
  }, []);

  return (
    <div className={styles.container}>
      {/* In-complete Todos */}
      <div>
        <div>To-do</div>
        <ul>
          {incompleteTodos.map((task) => (
            <li>
              <TodoTask todo={task} onClick={() => {}} />
            </li>
          ))}
        </ul>
      </div>
      {/* completed Todos */}
      <div>
        <div>Completed</div>
        <ul>
          {completedTodos.map((task) => (
            <li>
              <TodoTask todo={task} onClick={() => {}} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default memo(ViewTodos);
