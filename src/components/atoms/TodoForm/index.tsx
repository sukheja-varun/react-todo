import React, { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Todo } from '../../../types/todo';

import styles from './index.module.scss';

type FormData = {
  task: string;
};

const ERROR_MSG = {
  minLength: 'Must be 2 characters or more',
  maxLength: 'Must be 20 characters or less',
};

interface TodoFormProps {
  todo?: Todo | null;
  onSubmit: (todo: Todo) => void;
  onCancel: () => void;
}
const TodoForm: React.FC<TodoFormProps> = (props) => {
  const { todo, onSubmit, onCancel } = props;
  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  // Functions
  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    const title = data.task.trim();
    if (!title) return;

    const newTodo: Todo = todo || {
      id: 1,
      userId: 1,
      completed: false,
      title: '',
    };
    newTodo.title = title;
    onSubmit(newTodo);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <input
        className={errors.task ? styles.error : ''}
        type="text"
        placeholder="Add a task"
        defaultValue={todo?.title || ''}
        {...register('task', {
          minLength: 2,
          maxLength: 20,
        })}
      />
      {todo && (
        <button
          type="button"
          onClick={() => {
            reset();
            onCancel();
          }}
        >
          Cancel
        </button>
      )}
      <button type="submit">{todo ? 'Update' : 'Add'}</button>
      <div className={styles.alert}>
        {errors.task?.type === 'minLength' && ERROR_MSG.minLength}
        {errors.task?.type === 'maxLength' && ERROR_MSG.maxLength}
      </div>
    </form>
  );
};
export default memo(TodoForm);
