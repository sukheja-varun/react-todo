import React, { memo, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useStoreActions, useStoreState } from '../../../store';
import { Todo } from '../../../types/todo';
import TodoTask from '../../atoms/TodoTask';
import SortSelector, { SortBy } from '../SortSelector';

import styles from './index.module.scss';

const API_RECORDS_LIMIT = 10;

const ViewTodos: React.FC = () => {
  // Store
  const { getTodos, toggleTodo, deleteTodo, setToEdit } = useStoreActions(
    (store) => store.todos
  );
  const { completedTodos, incompleteTodos, hasMoreData } = useStoreState(
    (store) => store.todos
  );

  // State
  const [todosPageNumber, setTodosPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortedCompletedTodo, setSortedCompletedTodo] = useState<Todo[]>([]);
  const [sortedIncompleteTodo, setSortedIncompleteTodo] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos({ params: { _limit: API_RECORDS_LIMIT, _page: todosPageNumber } });
  }, [todosPageNumber]);

  const compareTitle = (a: Todo, b: Todo) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const clonedCompleteTodos = JSON.parse(JSON.stringify(completedTodos));
    const clonedIncompleteTodos = JSON.parse(JSON.stringify(incompleteTodos));

    if (sortBy === SortBy.Title) {
      clonedCompleteTodos.sort(compareTitle);
      clonedIncompleteTodos.sort(compareTitle);
    }
    setSortedCompletedTodo(clonedCompleteTodos);
    setSortedIncompleteTodo(clonedIncompleteTodos);
  }, [completedTodos, incompleteTodos, sortBy]);

  return (
    <>
      <SortSelector onChange={setSortBy} />
      <div className={styles.listContainer}>
        {/* In-complete Todos */}
        <div>
          <div>To-do</div>
          <ul>
            <TransitionGroup className="todo-list">
              {sortedIncompleteTodo.map((task) => (
                <CSSTransition key={task.id} timeout={500} classNames={styles}>
                  <li key={task.id}>
                    <TodoTask
                      todo={task}
                      onClick={(todo) => toggleTodo({ data: todo })}
                      onDelete={(todo) => deleteTodo({ data: todo })}
                      onEdit={(todo) => setToEdit(todo)}
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
              {sortedCompletedTodo.map((task) => (
                <CSSTransition key={task.id} timeout={500} classNames={styles}>
                  <li>
                    <TodoTask
                      todo={task}
                      onClick={(todo) => toggleTodo({ data: todo })}
                      onDelete={(todo) => deleteTodo({ data: todo })}
                      onEdit={(todo) => deleteTodo({ data: todo })}
                    />
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ul>
        </div>
      </div>
    </>
  );
};
export default memo(ViewTodos);
