import api from '../../api';
import { Todo } from '../../types/todo';

export default {
  getAll: () => {
    return api.get<Todo[]>(`todos`);
  },
  getById: (id: number) => {
    return api.get<Todo>(`todos/${id}`);
  },
  post: (todo: Todo) => {
    return api.post<Todo>('todos', todo);
  },
  put: (todo: Todo) => {
    return api.put<Todo>(`todos/${todo.id}`, todo);
  },
  delete: (id: number) => {
    return api.delete<Todo>(`todos/${id}`);
  },
};
