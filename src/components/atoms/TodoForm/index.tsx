import React, { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Todo } from '../../../types/todo';

import styles from './index.module.scss';

type FormData = {
  task: string;
};

const ERROR_MSG = {
  minLength: 'Must be 2 characters or more',
  maxLength: 'Must be 2 characters or less',
};

interface TodoFormProps {
  onCreate: (todo: Todo) => void;
}
const TodoForm: React.FC<TodoFormProps> = (props) => {
  const { onCreate } = props;
  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  // Functions
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const title = data.task.trim();
    if (!title) return;

    const newTodo: Todo = {
      id: 1,
      userId: 1,
      completed: false,
      title,
    };
    onCreate(newTodo);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <input
        className={errors.task ? styles.error : ''}
        type="text"
        placeholder="Add a task"
        defaultValue=""
        {...register('task', {
          minLength: 2,
          maxLength: 20,
        })}
      />
      <button type="submit">Add</button>
      <div className={styles.alert}>
        {errors.task?.type === 'minLength' && ERROR_MSG.minLength}
        {errors.task?.type === 'maxLength' && ERROR_MSG.maxLength}
      </div>
    </form>
  );
};
export default memo(TodoForm);
