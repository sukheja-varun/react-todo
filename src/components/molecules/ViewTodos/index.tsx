import React, { memo, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useStoreActions, useStoreState } from '../../../store';
import TodoTask from '../../atoms/TodoTask';

import styles from './index.module.scss';

const API_RECORDS_LIMIT = 10;

const ViewTodos: React.FC = () => {
  // Store
  const { getTodos, toggleTodo } = useStoreActions((store) => store.todos);
  const { completedTodos, incompleteTodos, hasMoreData } = useStoreState(
    (store) => store.todos
  );

  // State
  const [todosPageNumber, setTodosPageNumber] = useState(1);

  useEffect(() => {
    getTodos({ params: { _limit: API_RECORDS_LIMIT, _page: todosPageNumber } });
  }, [todosPageNumber]);

  return (
    <div className={styles.container}>
      {/* In-complete Todos */}
      <div>
        <div>To-do</div>
        <ul>
          <TransitionGroup className="todo-list">
            {incompleteTodos.map((task) => (
              <CSSTransition key={task.id} timeout={500} classNames={styles}>
                <li key={task.id}>
                  <TodoTask
                    todo={task}
                    onClick={(todo) => toggleTodo({ data: todo })}
                  />
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
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
          <TransitionGroup className="todo-list">
            {completedTodos.map((task) => (
              <CSSTransition key={task.id} timeout={500} classNames={styles}>
                <li>
                  <TodoTask
                    todo={task}
                    onClick={(todo) => toggleTodo({ data: todo })}
                  />
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
      </div>
    </div>
  );
};
export default memo(ViewTodos);
